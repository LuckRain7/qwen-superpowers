# Qwen Superpowers

**Idiomas:**
[English](README.md) |
[中文](README.zh.md) |
[日本語](README.ja.md) |
[한국어](README.ko.md) |
[Español](README.es.md) |
[Français](README.fr.md) |
[Deutsch](README.de.md)

---

Un sistema integral de habilidades para Qwen Code que impone prácticas de ingeniería de software profesionales mediante flujos de trabajo obligatorios.

## ¿Qué es esto?

Qwen Superpowers transforma Qwen Code de un asistente de codificación de propósito general en un agente de ingeniería disciplinado que sigue flujos de trabajo probados automáticamente. Garantiza:

- **Desarrollo Guiado por Pruebas** - Las pruebas siempre van primero
- **Planificación Sistemática** - No más codificación improvisada
- **Depuración Basada en Evidencia** - Análisis de causa raíz en lugar de adivinar
- **Calidad del Código** - Revisiones automatizadas y refactorización

## Instalación

### Instalación vía npx (Recomendado)

¡No requiere instalación! Usa `npx` para ejecutar comandos directamente:

```bash
# Ejecutar instalador interactivo
npx qwen-superpowers-r install

# Instalar en el proyecto actual sin prompts
npx qwen-superpowers-r install --local --yes

# Instalar globalmente sin prompts
npx qwen-superpowers-r install --global --yes

# Listar habilidades disponibles
npx qwen-superpowers-r list

# Crear una nueva habilidad
npx qwen-superpowers-r create-skill my-custom-skill

# Mostrar ayuda
npx qwen-superpowers-r help
```

El instalador interactivo te pedirá que elijas:
- **Current Project (Proyecto Actual)** - Instalar en el directorio `./.qwen/`
- **Global** - Instalar en `~/.qwen/` (compartir entre proyectos)

### Instalación vía Git

```bash
# Clonar este repositorio
git clone https://github.com/your-org/qwen-superpowers.git
cd qwen-superpowers

# Ejecutar usando npx
npx qwen-superpowers-r install --local
```

### Instalación Manual

1. Copiar el archivo `.qwen-plugin` a la raíz de tu proyecto
2. Ejecutar el instalador para copiar las habilidades a tu proyecto:
   ```bash
   npx qwen-superpowers-r install --local --yes
   ```
3. El instalador creará un directorio `.qwen/` con todos los archivos necesarios

## Cómo Funciona

### Flujo de Trabajo Obligatorio

Cuando le pides a Qwen Code implementar una función o corregir un error, sigue automáticamente esta secuencia:

1. **Brainstorming（Lluvia de Ideas）** → Clarifica requisitos mediante diálogo socrático
2. **Git Worktrees（Árboles de Trabajo Git）** → Crea espacio de trabajo aislado en rama
3. **Planning（Planificación）** → Divide el trabajo en tareas de 2-5 minutos con pasos de verificación
4. **Subagent-Driven Development（Desarrollo Guiado por Subagentes）** → Nuevo agente por tarea con TDD
5. **Code Review（Revisión de Código）** → Controles de calidad automatizados
6. **Branch Finalization（Finalización de Rama）** → Fusión limpia o creación de PR

### Filosofía Central

- **Desarrollo Guiado por Pruebas**: El ciclo Red-Green-Refactor es obligatorio
- **Sistemático Sobre Ad-Hoc**: Proceso sobre adivinar
- **Reducción de Complejidad**: La simplicidad es el objetivo principal
- **Evidencia Sobre Afirmaciones**: Verificar antes de declarar el éxito

## Habilidades Disponibles

### Habilidades de Flujo de Trabajo Obligatorio（Auto-Disparadas）

| Habilidad | Propósito |
|-------|---------|
| `brainstorming` | Clarificación de requisitos y creación de documento de diseño |
| `using-git-worktrees` | Configuración de espacio de trabajo aislado en rama |
| `writing-plans` | Planificación detallada de implementación |
| `subagent-driven-development` | Ejecución paralela de tareas con agentes nuevos |
| `test-driven-development` | Impone el ciclo TDD |
| `requesting-code-review` | Controles de calidad automatizados |
| `finishing-a-development-branch` | Finalización limpia de rama |

### Habilidades de Soporte

| Habilidad | Propósito |
|-------|---------|
| `systematic-debugging` | Análisis de causa raíz en 4 fases |
| `verification-before-completion` | Garantiza que las correcciones realmente funcionen |
| `dispatching-parallel-agents` | Ejecutar múltiples agentes simultáneamente |
| `receiving-code-review` | Manejar retroalimentación de revisión |
| `writing-skills` | Crear nuevas habilidades |

## Uso

### Iniciando una Nueva Tarea

Simplemente describe lo que quieres lograr:

```
Quiero agregar autenticación de usuarios a mi aplicación
```

Qwen Code automáticamente:
1. Hará preguntas de clarificación
2. Creará un documento de diseño
3. Configurar una rama aislada
4. Creará un plan detallado
5. Ejecutará el plan con TDD

### Invocación Manual de Habilidades

También puedes invocar habilidades manualmente:

```
/superpowers brainstorming
/superpowers writing-plans
/superpowers systematic-debugging
```

## Arquitectura

```
qwen-superpowers/
├── .qwen-plugin          # Metadatos del plugin
├── QWEN.md               # Inyección de mensaje del sistema
├── skills/               # Definiciones de habilidades（Markdown）
│   ├── brainstorming/
│   ├── using-git-worktrees/
│   ├── writing-plans/
│   ├── subagent-driven-development/
│   ├── test-driven-development/
│   ├── requesting-code-review/
│   ├── finishing-a-development-branch/
│   ├── systematic-debugging/
│   ├── verification-before-completion/
│   ├── dispatching-parallel-agents/
│   ├── receiving-code-review/
│   ├── writing-skills/
│   └── using-superpowers/
├── hooks/                # Configuraciones de auto-disparo
├── commands/             # Comandos de invocación manual
├── agents/               # Definiciones de comportamiento de agentes
├── scripts/              # Scripts de instalación y utilidad
└── docs/                 # Documentación
```

## Creando Habilidades Personalizadas

Consulta `skills/writing-skills.md` para una guía sobre cómo crear tus propias habilidades.

## Licencia

MIT
