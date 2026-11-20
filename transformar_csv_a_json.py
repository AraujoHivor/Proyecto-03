"""Proyecto 03 - Sprint 1: convertir SuperStore_Orders.csv a JSON.

Ejecutar desde esta carpeta:
    python transformar_csv_a_json.py
"""

import csv
import json
from datetime import datetime
from pathlib import Path

CARPETA = Path(__file__).parent
ARCHIVO_CSV = CARPETA / "SuperStore_Orders.csv"
ARCHIVO_JSON = CARPETA / "SuperStore_Orders.json"

# Tipos revisados a partir del CSV original.
ENTEROS = {"sales", "quantity", "year"}
DECIMALES = {"discount", "profit", "shipping_cost"}
FECHAS = {"order_date", "ship_date"}


def convertir_valor(campo, valor):
    """Limpia espacios y convierte cada columna a su tipo."""
    valor = valor.strip()

    if valor == "":
        return None

    if campo in ENTEROS:
        # sales puede contener separadores de miles: "1,239" -> 1239
        return int(valor.replace(",", ""))

    if campo in DECIMALES:
        return float(valor.replace(",", ""))

    if campo in FECHAS:
        fecha = datetime.strptime(valor, "%d-%m-%Y")
        return fecha.strftime("%Y-%m-%d")

    return valor  # Texto: categoría, región, identificadores, etc.


def main():
    registros = []
    valores_vacios = 0

    # Este archivo original está codificado en Windows-1252 (cp1252).
    with ARCHIVO_CSV.open("r", encoding="cp1252", newline="") as archivo:
        lector = csv.DictReader(archivo)
        columnas = lector.fieldnames or []

        for numero_fila, fila in enumerate(lector, start=2):
            registro = {}
            for campo in columnas:
                try:
                    registro[campo] = convertir_valor(campo, fila[campo])
                except (ValueError, TypeError) as error:
                    raise ValueError(
                        f"Dato incorrecto en fila {numero_fila}, columna {campo}: "
                        f"{fila[campo]!r}"
                    ) from error

                if registro[campo] is None:
                    valores_vacios += 1

            registros.append(registro)

    with ARCHIVO_JSON.open("w", encoding="utf-8") as archivo:
        json.dump(registros, archivo, ensure_ascii=False, indent=2)

    # Leemos el archivo generado para comprobar su estructura.
    with ARCHIVO_JSON.open("r", encoding="utf-8") as archivo:
        datos_json = json.load(archivo)

    assert isinstance(datos_json, list)
    assert len(datos_json) == len(registros)
    assert all(len(fila) == len(columnas) for fila in datos_json)
    assert all(isinstance(fila["sales"], int) for fila in datos_json)
    assert all(isinstance(fila["profit"], (int, float)) for fila in datos_json)

    print("Conversión finalizada correctamente.")
    print(f"Registros CSV y JSON: {len(datos_json)}")
    print(f"Columnas por registro: {len(columnas)}")
    print(f"Valores vacíos encontrados: {valores_vacios}")
    print(f"Archivo generado: {ARCHIVO_JSON.name}")


if __name__ == "__main__":
    main()
