const modulesMock = [
    {
        module_id:1,
        name: 'Home',
        route:"/home",
        description:"Pagina de incio de GEA",
    },
    {
        module_id:2,
        name: 'Perfil de Usuario',
        route:"/user_profile",
        description:"Perfil de usuario",
    },
    {
        module_id:3,
        name: 'Administración',
        route:"/management",
        description:"Pagina de administración de recursos",
    },
    {
        module_id:4,
        name: 'Módulos',
        route:"/modules",
        description:"Pagina de Administración de Módulos",
    },
    {
        module_id:5,
        name: 'Control Operativo',
        route:"/operative_control",
        description:"Página de control de ejecución de contratos",
    },
    {
        module_id:6,
        name: 'Inventarios',
        route:"/inventary",
        description:"Página de control de inventarios",
    },
    {
        module_id:7,
        name: 'Certificados',
        route:"/certificates",
        description:"Página de control de certificados de calibración",
    },
]

function filteredModulesMocks(name) {
    return modulesMock.filter(module => module.name.includes(name))
}

class ModulesServiceMock {
    async getModules() {
        return Promise.resolve(modulesMock)
    }

    async createModule() {
        return Promise.resolve(modulesMock[0])
    }
}

module.exports = {
    modulesMock,
    filteredModulesMocks,
    ModulesServiceMock
}