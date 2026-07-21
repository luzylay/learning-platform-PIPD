using Microsoft.AspNetCore.Mvc;

namespace OIT1_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PandasController : ControllerBase
    {
        /// <summary>
        /// Pregunta 11: Ventajas de Pandas
        /// </summary>
        [HttpGet("pandas-advantages")]
        public IActionResult GetPandasAdvantages()
        {
            return Ok(new
            {
                question = "Ventajas de Pandas en proyectos de IA",
                advantages = new[]
                {
                    new
                    {
                        name = "DataFrame Estructurado",
                        description = "Tablas con indexación eficiente para manipulación de datos",
                        features = new[]
                        {
                            "Manejo de datos faltantes (NaN)",
                            "Operaciones vectorizadas",
                            "Indexación múltiple (MultiIndex)"
                        },
                        code = "df = pd.DataFrame(data, columns=['col1', 'col2'])"
                    },
                    new
                    {
                        name = "Limpieza y Transformación",
                        description = "Herramientas poderosas para preparar datos",
                        features = new[]
                        {
                            "dropna(): Eliminar valores nulos",
                            "fillna(): Rellenar valores faltantes",
                            "apply(): Aplicar funciones personalizadas",
                            "map(): Transformar valores"
                        },
                        code = "df_clean = df.dropna().fillna(0)"
                    },
                    new
                    {
                        name = "Operaciones Eficientes",
                        description = "Funcionalidades optimizadas para grandes conjuntos",
                        features = new[]
                        {
                            "groupby(): Agrupación y agregación",
                            "merge(): Combinación de DataFrames",
                            "pivot_table(): Tablas dinámicas",
                            "rolling(): Ventanas deslizantes"
                        },
                        code = "df.groupby('categoria').agg({'valor': ['mean', 'std']})"
                    }
                },
                key_functionalities = new[]
                {
                    "Lectura/escritura de múltiples formatos (CSV, Excel, JSON, SQL)",
                    "Integración con NumPy para operaciones numéricas",
                    "Visualización directa con Matplotlib",
                    "Operaciones de series temporales",
                    "Manejo de datos categóricos"
                },
                performance = new
                {
                    description = "Operaciones en C (optimizadas), uso eficiente de memoria",
                    example = "Procesamiento de 1GB de datos en segundos"
                }
            });
        }
    }
}
