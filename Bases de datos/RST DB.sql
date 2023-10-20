-- Crear la base de datos
CREATE DATABASE SistemaRST;
USE SistemaRST;

-- Tabla de Contribuyentes (Personas Naturales)
CREATE TABLE Contribuyentes (
    ContribuyenteID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(255),
    Identificacion VARCHAR(20) UNIQUE,
    Direccion VARCHAR(255)
);

-- Tabla de Personas Jurídicas
CREATE TABLE PersonasJuridicas (
    PersonaJuridicaID INT PRIMARY KEY AUTO_INCREMENT,
    NombreEmpresa VARCHAR(255),
    IdentificacionLegal VARCHAR(20) UNIQUE,
    DireccionLegal VARCHAR(255)
);

-- Tabla de Declaraciones de Impuestos
CREATE TABLE DeclaracionesImpuestos (
    DeclaracionID INT PRIMARY KEY AUTO_INCREMENT,
    ContribuyenteID INT,
    PersonaJuridicaID INT,
    Fecha DATE,
    MontoTotal DECIMAL(10, 2),
    FOREIGN KEY (ContribuyenteID) REFERENCES Contribuyentes(ContribuyenteID),
    FOREIGN KEY (PersonaJuridicaID) REFERENCES PersonasJuridicas(PersonaJuridicaID)
);

-- Tabla de Conceptos Tributarios
CREATE TABLE ConceptosTributarios (
    ConceptoID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Descripcion TEXT,
    Tarifa DECIMAL(5, 2)
);

-- Tabla de Beneficios Tributarios
CREATE TABLE BeneficiosTributarios (
    BeneficioID INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Descripcion TEXT
);

-- Tabla de Formalización Empresarial
CREATE TABLE FormalizacionEmpresarial (
    FormalizacionID INT PRIMARY KEY AUTO_INCREMENT,
    ContribuyenteID INT,
    PersonaJuridicaID INT,
    FechaFormalizacion DATE,
    FOREIGN KEY (ContribuyenteID) REFERENCES Contribuyentes(ContribuyenteID),
    FOREIGN KEY (PersonaJuridicaID) REFERENCES PersonasJuridicas(PersonaJuridicaID)
);

-- Tabla de Municipios
CREATE TABLE Municipios (
    MunicipioID INT PRIMARY KEY AUTO_INCREMENT,
    NombreMunicipio VARCHAR(100)
);

-- Tabla de Relación entre Declaraciones, Impuestos y Conceptos Tributarios
CREATE TABLE DeclaracionesImpuestosConceptos (
    DeclaracionID INT,
    ConceptoID INT,
    Cantidad INT,
    MontoImpuesto DECIMAL(10, 2),
    FOREIGN KEY (DeclaracionID) REFERENCES DeclaracionesImpuestos(DeclaracionID),
    FOREIGN KEY (ConceptoID) REFERENCES ConceptosTributarios(ConceptoID)
);

-- Tabla de Relación entre Contribuyentes y Beneficios Tributarios
CREATE TABLE ContribuyentesBeneficios (
    ContribuyenteID INT,
    BeneficioID INT,
    FOREIGN KEY (ContribuyenteID) REFERENCES Contribuyentes(ContribuyenteID),
    FOREIGN KEY (BeneficioID) REFERENCES BeneficiosTributarios(BeneficioID)
);

-- Tabla de Relación entre Contribuyentes y Municipios
CREATE TABLE ContribuyentesMunicipios (
    ContribuyenteID INT,
    MunicipioID INT,
    FOREIGN KEY (ContribuyenteID) REFERENCES Contribuyentes(ContribuyenteID),
    FOREIGN KEY (MunicipioID) REFERENCES Municipios(MunicipioID)
);
