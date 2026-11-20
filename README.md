# Proyecto 03 - Sprint 1: Transformación CSV a JSON

Materia: Desarrollo de Aplicaciones Web y Móviles (SOFG1006) - ESPOL.

## Archivos

- `SuperStore_Orders.csv`: conjunto de datos original (51.290 registros, 21 columnas).
- `transformar_csv_a_json.py`: script de conversión y validación en Python.
- `SuperStore_Orders.json`: conjunto de datos convertido a formato JSON.

## Cómo ejecutar el script

1. Tener Python 3 instalado.
2. Abrir esta carpeta en VS Code.
3. Abrir una terminal en la carpeta que contiene el script y el CSV.
4. Ejecutar:

   ```bash
   python transformar_csv_a_json.py
   ```

5. El programa volverá a generar `SuperStore_Orders.json` y mostrará el resultado de la validación.

No es necesario instalar bibliotecas adicionales: se usan `csv`, `json`, `datetime` y `pathlib`, que vienen con Python.

## Transformación realizada

- Las columnas categóricas e identificadores se mantienen como texto sin espacios innecesarios en los extremos.
- `sales`, `quantity` y `year` se convierten a enteros. Se eliminan las comas usadas como separadores de miles en `sales`.
- `profit`, `discount` y `shipping_cost` se convierten a números decimales.
- `order_date` y `ship_date` pasan del formato `DD-MM-AAAA` a `AAAA-MM-DD` (ISO 8601).
- Si una celda estuviera vacía se guardaría como `null`. En este archivo no se encontraron celdas vacías.
- Si una fecha o un valor numérico no es válido, el programa se detiene e indica la fila y la columna afectadas; no sustituye un dato incorrecto por 0.

## Validación

Se comprobó que el JSON completo se puede volver a abrir, contiene 51.290 registros y cada registro conserva sus 21 columnas. No se encontraron valores vacíos ni errores de fecha o número. Las ventas totales del JSON suman 12.642.905; la ganancia total, 1.469.034,82128; y la cantidad vendida, 178.312.

El periodo de pedidos llega hasta 2014; algunos envíos se realizaron en los primeros días de 2015, lo cual es coherente con las fechas del CSV.

