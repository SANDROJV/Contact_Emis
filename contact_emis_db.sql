CREATE TABLE organizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255)
);

CREATE TABLE workers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    org_id INT,
    full_name VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    position VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    employment_year YEAR,
    image VARCHAR(255),
    FOREIGN KEY (org_id) REFERENCES organizations(id)
);

INSERT INTO organizations (name, logo) VALUES
('საქართველოს განათლების, მეცნიერებისა და ახალგაზრდობის სამინისტრო', 'mes.png'),
('სსიპ განათლების მართვის საინფორმაციო სისტემა', 'emis.png'),
('სსიპ საგანმანათლებლო და სამეცნიერო ინფრასტრუქტურის განვითარების  სააგენტო', 'esida.png'),
('სსიპ განათლების ხარისხის განვითარების ეროვნული ცენტრი', 'eqe.png'),
('სსიპ მასწავლებელთა პროფესიული განვითარების ეროვნული ცენტრი', 'tpdc.png'),
('სსიპ შოთა რუსთაველის საქართველოს ეროვნული სამეცნიერო ფონდი', 'rustaveli.png'),
('სსიპ საგანმანათლებლო დაწესებულების მანდატურის სამსახური', 'mandat.png'),
('სსიპ განათლების საერთაშორისო ცენტრი', 'iec.png'),
('სსიპ ზურაბ ჟვანიას სახელობის სახელმწიფო ადმინისტრირების სკოლა', 'zspa.png'),
('სსიპ შეფასებისა და გამოცდების ეროვნული ცენტრი', 'naec.png'),
('სსიპ ახალგაზრდობის სააგენტო', 'youth.png'),
('სსიპ საგანმანათლებლო კველვების ეროვნული ცენტრი', 'ncer.png');

-- Sample workers
INSERT INTO workers (org_id, full_name, department, position, email, phone, employment_year, image) VALUES
(1, 'Irakli Kapanadze', 'IT Department', 'Engineer', 'ikapanadze@mes.gov.ge', '599123456', 2020, 'default.png'),
(1, 'Nino Giorgadze', 'Administration', 'Manager', 'ngiorgadze@mes.gov.ge', '577112233', 2022, 'default.png'),
(2, 'Dato Beridze', 'Medical Staff', 'Supervisor', 'dberidze@moh.gov.ge', '555998877', 2019, 'default.png'),
(3, 'Levan Tsereteli', 'Finance Division', 'Auditor', 'ltsereteli@mof.gov.ge', '593445566', 2021, 'default.png');
