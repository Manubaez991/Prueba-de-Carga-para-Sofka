-- Prueba - Login Service --

# Requisitos
	- K6 v0.45.0+
	- Node.js 18+

# Pasos para Ejecutar
	1. Instalar K6: `npm install -g k6`
	2. Ejecutar la prueba: `k6 run script.js`
	3. Generar reporte: `k6 run script.js --out csv=results.csv`

## Validaciones
- **TPS Objetivo**: 20
- **Tiempo de Respuesta**: <1.5s (95% de las peticiones)
- **Tasa de Error**: <3%
