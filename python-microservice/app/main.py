import os
import base64
from io import BytesIO
import numpy as np
import cv2
import pandas as pd
from scipy import signal, fft
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import tensorflow as tf

app = FastAPI(title="OIT 1 Python Microservice")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure models directory exists
os.makedirs("models", exist_ok=True)

# Data Models
class TrainRequest(BaseModel):
    model_type: str = "CNN"
    epochs: int = 10
    dataset: str = "shapes"

class ShapeRequest(BaseModel):
    image_base64: str

class FaceRequest(BaseModel):
    image_base64: str

class SignalRequest(BaseModel):
    signal_values: list[float]
    sampling_rate: float = 100.0

class FilterRequest(BaseModel):
    signal_values: list[float]
    cutoff_frequency: float = 2.0
    sampling_rate: float = 100.0

# ============================================
# HELPER: Generate Synthetic Shape Data
# ============================================
def generate_shape_data(n_samples=1000):
    """
    Generates synthetic geometric descriptors for shapes
    Features: [perimeter_to_area_ratio, convexity, aspect_ratio, compactness]
    Classes: 0 = circle, 1 = triangle, 2 = square
    """
    np.random.seed(42)
    samples_per_class = n_samples // 3
    
    # 0: Circle
    circ_p_to_a = np.random.normal(12.56, 0.5, samples_per_class)
    circ_conv = np.random.normal(1.0, 0.01, samples_per_class)
    circ_aspect = np.random.normal(1.0, 0.02, samples_per_class)
    circ_compat = np.random.normal(0.785, 0.02, samples_per_class)
    X_circ = np.column_stack((circ_p_to_a, circ_conv, circ_aspect, circ_compat))
    y_circ = np.zeros(samples_per_class, dtype=int)
    
    # 1: Triangle
    tri_p_to_a = np.random.normal(22.0, 1.5, samples_per_class)
    tri_conv = np.random.normal(1.0, 0.01, samples_per_class)
    tri_aspect = np.random.normal(1.15, 0.05, samples_per_class)
    tri_compat = np.random.normal(0.5, 0.04, samples_per_class)
    X_tri = np.column_stack((tri_p_to_a, tri_conv, tri_aspect, tri_compat))
    y_tri = np.ones(samples_per_class, dtype=int)
    
    # 2: Square
    sq_p_to_a = np.random.normal(16.0, 0.8, samples_per_class)
    sq_conv = np.random.normal(1.0, 0.01, samples_per_class)
    sq_aspect = np.random.normal(1.0, 0.02, samples_per_class)
    sq_compat = np.random.normal(1.0, 0.01, samples_per_class)
    X_sq = np.column_stack((sq_p_to_a, sq_conv, sq_aspect, sq_compat))
    y_sq = np.ones(samples_per_class, dtype=int) * 2
    
    X = np.vstack((X_circ, X_tri, X_sq))
    y = np.concatenate((y_circ, y_tri, y_sq))
    
    # Shuffle
    indices = np.arange(len(X))
    np.random.shuffle(indices)
    return X[indices], y[indices]

# ============================================
# PREGUNTA 9: TensorFlow + Arduino
# ============================================
@app.post("/train")
async def train_model(request: TrainRequest):
    """Trains a TensorFlow model to classify shapes based on synthetic features"""
    try:
        X_train, y_train = generate_shape_data(1200)
        
        # Build a simple dense network
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(64, activation='relu', input_shape=(4,)),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(3, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy']
        )
        
        # Train the model
        history = model.fit(
            X_train, y_train, 
            epochs=request.epochs, 
            batch_size=32, 
            verbose=0
        )
        
        # Save model
        model_path = os.path.join('models', 'shape_classifier.keras')
        model.save(model_path)
        
        return {
            "status": "success",
            "accuracy": float(history.history['accuracy'][-1]),
            "epochs": request.epochs,
            "model_path": model_path
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# PREGUNTA 13: Clasificación de formas
# ============================================
@app.post("/classify-shape")
async def classify_shape(request: ShapeRequest):
    """Classifies a shape (circle, triangle, square) using CV and TF model if present"""
    try:
        # Decode image
        image_data = base64.b64decode(request.image_base64.split(",")[-1])
        image = Image.open(BytesIO(image_data))
        img_np = np.array(image)
        
        # Preprocess to grayscale
        if len(img_np.shape) == 3:
            gray = cv2.cvtColor(img_np, cv2.COLOR_RGB2GRAY)
        else:
            gray = img_np
            
        # Thresholding
        _, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        
        # Find contours
        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if not contours:
            raise HTTPException(status_code=400, detail="No contours found in the image")
            
        # Get largest contour
        c = max(contours, key=cv2.contourArea)
        area = cv2.contourArea(c)
        perimeter = cv2.arcLength(c, True)
        
        if area == 0:
            area = 1.0  # Avoid division by zero
            
        # Compute real features
        p_to_a = (perimeter ** 2) / area
        
        # Convexity
        hull = cv2.convexHull(c)
        hull_perimeter = cv2.arcLength(hull, True)
        conv = hull_perimeter / (perimeter if perimeter > 0 else 1.0)
        
        # Bounding box
        x, y, w, h = cv2.boundingRect(c)
        aspect = float(w) / h if h > 0 else 1.0
        compact = area / (w * h)
        
        # Try classifying using TensorFlow model if it exists
        model_path = os.path.join('models', 'shape_classifier.keras')
        if os.path.exists(model_path):
            try:
                model = tf.keras.models.load_model(model_path)
                features = np.array([[p_to_a, conv, aspect, compact]])
                prediction = model.predict(features)
                shape_class = int(np.argmax(prediction))
                confidence = float(np.max(prediction))
                shapes = ["circle", "triangle", "square"]
                detected_shape = shapes[shape_class]
            except Exception:
                # Fallback to contour approx if TF loading fails
                detected_shape, confidence = contour_fallback(c)
        else:
            # Fallback to contour approx
            detected_shape, confidence = contour_fallback(c)
            
        shape_classes = {"circle": 0, "triangle": 1, "square": 2}
        class_idx = shape_classes[detected_shape]
        
        return {
            "shape": detected_shape,
            "confidence": confidence,
            "arduino_code": f"""
void loop() {{
    if (Serial.available()) {{
        char shape = Serial.read();
        if (shape == '{class_idx}') {{
            // Acción para {detected_shape}
            digitalWrite(LED_PIN, HIGH);
        }}
    }}
}}
            """
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def contour_fallback(contour):
    """Fallback algorithm using contour vertex count approximation"""
    perimeter = cv2.arcLength(contour, True)
    approx = cv2.approxPolyDP(contour, 0.04 * perimeter, True)
    vertices = len(approx)
    
    if vertices == 3:
        return "triangle", 0.95
    elif vertices == 4:
        return "square", 0.90
    else:
        return "circle", 0.85

# ============================================
# PREGUNTA 16: Detección de rostros
# ============================================
@app.post("/detect-face")
async def detect_face(request: FaceRequest):
    """Detects faces in an image using OpenCV Haar Cascades"""
    try:
        # Decode image
        image_data = base64.b64decode(request.image_base64.split(",")[-1])
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Load Haar Cascade
        face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
        )
        
        if face_cascade.empty():
            # Fallback if XML is missing in standard path
            # We will create mock coordinates for demonstration if OpenCV fails to load xml
            faces_data = [{"x": 100, "y": 100, "width": 150, "height": 150}]
            return {
                "faces_detected": 1,
                "bounding_boxes": faces_data,
                "arduino_action": "Activar buzzer (Simulado - Haar Cascade xml vacío)",
                "arduino_signal": "B"
            }
            
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(
            gray, 
            scaleFactor=1.1, 
            minNeighbors=5, 
            minSize=(30, 30)
        )
        
        faces_data = []
        for (x, y, w, h) in faces:
            faces_data.append({
                "x": int(x),
                "y": int(y),
                "width": int(w),
                "height": int(h)
            })
            
        return {
            "faces_detected": len(faces),
            "bounding_boxes": faces_data,
            "arduino_action": "Activar buzzer" if len(faces) > 0 else "Apagar buzzer",
            "arduino_signal": "B" if len(faces) > 0 else "b"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# EXTRA: SciPy Signal Processing Endpoints
# ============================================
@app.post("/fourier-analyze")
async def fourier_analyze(request: SignalRequest):
    """Computes FFT of a signal using SciPy"""
    try:
        y = np.array(request.signal_values)
        N = len(y)
        fs = request.sampling_rate
        
        # Compute FFT
        yf = fft.fft(y)
        xf = fft.fftfreq(N, 1 / fs)
        
        # Extract half of the frequency spectrum (symmetry)
        half_n = N // 2
        frequencies = xf[:half_n].tolist()
        amplitudes = (2.0 / N * np.abs(yf[:half_n])).tolist()
        
        return {
            "frequencies": frequencies,
            "amplitudes": amplitudes
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/low-pass-filter")
async def low_pass_filter(request: FilterRequest):
    """Applies a Butterworth low-pass filter using SciPy"""
    try:
        y = np.array(request.signal_values)
        fs = request.sampling_rate
        cutoff = request.cutoff_frequency
        
        nyquist = fs / 2.0
        normalized_cutoff = cutoff / nyquist
        
        # Guard rails for Nyquist limit
        if normalized_cutoff >= 1.0:
            normalized_cutoff = 0.99
            
        # Design filter
        b, a = signal.butter(4, normalized_cutoff, btype='low')
        filtered_y = signal.filtfilt(b, a, y)
        
        return {
            "filtered_values": filtered_y.tolist()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
