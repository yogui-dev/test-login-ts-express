# README - Prueba JMeter: Login + Countries

Este directorio contiene el plan de prueba de Apache JMeter `Ejercicio-40-login-countries.jmx` para probar el login del API y el listado de países con paginación.

## Requisitos
- Java 8+ (JRE/JDK)
- Apache JMeter 5.6.3 (o compatible)
- API levantada localmente en `http://localhost:3000` (ver sección siguiente)

## Preparar el API (Express + TypeScript)
Desde la raíz del proyecto (`../`):
```bash
npm install
npm run seed    # crea usuario admin y países
npm run dev     # inicia API en http://localhost:3000
```

## Ejecución en modo GUI (JMeter)
1. Abre JMeter GUI (`bin/jmeter` o `bin/jmeter.bat`).
2. File > Open… y selecciona `Ejercicio-40-login-countries.jmx`.
3. Ajusta, si lo deseas, el Thread Group (usuarios concurrentes, ramp-up, duración).
4. Ejecuta el plan (botón Play). Para depurar, agrega un listener (p.ej. View Results in Table).

## Ejecución en modo CLI (Headless) — recomendado
Desde esta carpeta (`jmeter/`). Crea un directorio de resultados:
```bash
mkdir -p results 2>NUL || true
```

- Windows (CMD/PowerShell):
```bat
set JMETER_HOME=C:\apache-jmeter-5.6.3
"%JMETER_HOME%\bin\jmeter.bat" -n -t "Ejercicio-40-login-countries.jmx" -l "results\results.jtl" -e -o "results\html-report"
```

- Git Bash / WSL / Linux / macOS:
```bash
export JMETER_HOME="$HOME/apache-jmeter-5.6.3"
"$JMETER_HOME/bin/jmeter" -n -t "Ejercicio-40-login-countries.jmx" -l "results/results.jtl" -e -o "results/html-report"
```

Al finalizar, abre el reporte HTML en `results/html-report/index.html`.

## Endpoints cubiertos por el plan
- `POST /api/auth/login` — obtiene token de autenticación.
- `GET /api/countries?limit=10&page=1` — listado público con paginación.

Nota: El endpoint de países es público; el login se utiliza como parte del flujo de prueba general.

## Concurrencia por defecto del plan (ajustable)
- Usuarios (threads): 50
- Ramp-up: 300 segundos
- Duración: 720 segundos (scheduler)
- Loops: 1

Estos valores se pueden modificar en el Thread Group dentro del JMX.

## Parámetros y personalización
- Para cambiar URLs o credenciales, edita los elementos HTTP Request o define variables en "User Defined Variables" dentro del plan.
- Si deseas pasar propiedades por CLI, usa `-Jprop=value` y referencia `/${__P(prop,default)}` en el JMX (requiere ajuste del plan).

## Solución de problemas
- "jmeter no se reconoce": asegúrate de que `JMETER_HOME` apunte a la instalación y usa `bin/jmeter(.bat)`.
- Conexión rechazada: verifica que el API esté arriba en `http://localhost:3000`.
- Errores 401: asegúrate de que el login esté funcionando y que el token se propague si el flujo lo requiere.

---
Última actualización: 2025-08-25
