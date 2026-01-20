-- CreateTable
CREATE TABLE "Usuario" (
    "usu_id" SERIAL NOT NULL,
    "usu_nome" TEXT NOT NULL,
    "usu_email" TEXT NOT NULL,
    "usu_senha" TEXT NOT NULL,
    "pap_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("usu_id")
);

-- CreateTable
CREATE TABLE "Papel" (
    "pap_id" SERIAL NOT NULL,
    "pap_tipo" TEXT NOT NULL,

    CONSTRAINT "Papel_pkey" PRIMARY KEY ("pap_id")
);

-- CreateTable
CREATE TABLE "Produto" (
    "prd_id" SERIAL NOT NULL,
    "prd_nome" TEXT NOT NULL,
    "prd_quantidade" INTEGER NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("prd_id")
);

-- CreateTable
CREATE TABLE "Atendimento" (
    "ate_id" SERIAL NOT NULL,
    "ate_data" TIMESTAMP(3) NOT NULL,
    "ate_valortotal" DOUBLE PRECISION NOT NULL,
    "pet_id" INTEGER NOT NULL,
    "ser_id" INTEGER NOT NULL,

    CONSTRAINT "Atendimento_pkey" PRIMARY KEY ("ate_id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "ser_id" SERIAL NOT NULL,
    "ser_nome" TEXT NOT NULL,
    "ser_preco" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("ser_id")
);

-- CreateTable
CREATE TABLE "Pets" (
    "pet_id" SERIAL NOT NULL,
    "pet_nome" TEXT NOT NULL,
    "pet_idade" INTEGER NOT NULL,
    "cli_id" INTEGER NOT NULL,
    "esp_id" INTEGER NOT NULL,
    "rac_id" INTEGER NOT NULL,

    CONSTRAINT "Pets_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "Especie" (
    "esp_id" SERIAL NOT NULL,
    "esp_nome" TEXT NOT NULL,

    CONSTRAINT "Especie_pkey" PRIMARY KEY ("esp_id")
);

-- CreateTable
CREATE TABLE "Raca" (
    "rac_id" SERIAL NOT NULL,
    "rac_nome" TEXT NOT NULL,

    CONSTRAINT "Raca_pkey" PRIMARY KEY ("rac_id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "cli_id" SERIAL NOT NULL,
    "cli_nome" TEXT NOT NULL,
    "cli_telefone" TEXT NOT NULL,
    "cli_email" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cli_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Especie_esp_nome_key" ON "Especie"("esp_nome");

-- CreateIndex
CREATE UNIQUE INDEX "Raca_rac_nome_key" ON "Raca"("rac_nome");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cli_email_key" ON "Cliente"("cli_email");

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_pap_id_fkey" FOREIGN KEY ("pap_id") REFERENCES "Papel"("pap_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pets"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atendimento" ADD CONSTRAINT "Atendimento_ser_id_fkey" FOREIGN KEY ("ser_id") REFERENCES "Servico"("ser_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_cli_id_fkey" FOREIGN KEY ("cli_id") REFERENCES "Cliente"("cli_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_esp_id_fkey" FOREIGN KEY ("esp_id") REFERENCES "Especie"("esp_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pets" ADD CONSTRAINT "Pets_rac_id_fkey" FOREIGN KEY ("rac_id") REFERENCES "Raca"("rac_id") ON DELETE RESTRICT ON UPDATE CASCADE;
