-- CreateEnum
CREATE TYPE "TeamStatus" AS ENUM ('APPLIED', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('APPLIED', 'ACTIVE', 'INACTIVE', 'REJECTED', 'RESIGNED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('APPLIED', 'ACTIVE', 'INACTIVE', 'REJECTED');

-- CreateEnum
CREATE TYPE "Embedding" AS ENUM ('0.0', '0.5', '1.0', '1.5', '2.0', '2.5', '1.1', '2.0_B', '2.0_W', '1.0_W', '1.0_B', '3.0', '3.5');

-- CreateEnum
CREATE TYPE "Channel" AS ENUM ('lab', 'luminance', 'data', 'rgb', 'yuv', 'cmyk', 'ycrcb');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "ProductInfoType" AS ENUM ('text', 'number', 'boolean', 'date', 'url', 'image');

-- CreateTable
CREATE TABLE "Teams" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "call" TEXT,
    "logoImage" TEXT,
    "businessNumber" TEXT,
    "businessImage" TEXT,
    "homepage" TEXT,
    "managerName" TEXT,
    "managerEmail" TEXT,
    "managerPhone" TEXT,
    "address" TEXT,
    "status" "TeamStatus" NOT NULL DEFAULT 'ACTIVE',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "apiKey" UUID NOT NULL,
    "apiSecret" UUID NOT NULL,
    "refreshToken" TEXT,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "name" TEXT,
    "birth" TEXT,
    "password" TEXT NOT NULL,
    "bmCode" INTEGER NOT NULL DEFAULT 0,
    "status" "UserStatus" NOT NULL DEFAULT 'APPLIED',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isStaff" BOOLEAN NOT NULL DEFAULT false,
    "isCustomer" BOOLEAN NOT NULL DEFAULT false,
    "isProgram" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versions" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Versions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "versionId" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industries" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "versionId" INTEGER NOT NULL,
    "versionCode" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "maxTeamCode" BIGINT,
    "maxMainCategoryCode" BIGINT,
    "maxSubCategoryCode" BIGINT,
    "maxProjectCode" BIGINT,
    "maxProductCode" BIGINT,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "isVariable" BOOLEAN NOT NULL DEFAULT false,
    "isMaxCode" BOOLEAN NOT NULL DEFAULT false,
    "isDigital" BOOLEAN NOT NULL DEFAULT false,
    "isNFT" BOOLEAN NOT NULL DEFAULT false,
    "isAdminOnly" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Industries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MainCategories" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "industryId" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "order" INTEGER,
    "countProject" INTEGER DEFAULT 0,

    CONSTRAINT "MainCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubCategories" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "mainCategoryId" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "order" INTEGER,
    "countProject" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SubCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bms" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "maxProductCode" BIGINT NOT NULL,
    "maxUserCode" BIGINT NOT NULL,
    "price" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Bms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "versionId" INTEGER,
    "versionCode" INTEGER,
    "countryId" INTEGER,
    "countryCode" INTEGER,
    "industryId" INTEGER,
    "industryCode" INTEGER,
    "teamId" INTEGER,
    "teamCode" INTEGER,
    "mainCategoryId" INTEGER,
    "mainCategoryCode" INTEGER,
    "subCategoryId" INTEGER,
    "subCategoryCode" INTEGER,
    "bmId" INTEGER,
    "bmCode" INTEGER,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "bannerImage" TEXT,
    "homepage" TEXT,
    "status" "ProjectStatus" NOT NULL DEFAULT 'APPLIED',

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "projectId" INTEGER,
    "userId" INTEGER,
    "userCode" INTEGER,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sourceImage" TEXT,
    "resizedSourceImage" TEXT,
    "labcodeImage" TEXT,
    "url" TEXT,
    "urlPurchase" TEXT,
    "urlCustom" TEXT,
    "urlInstagram" TEXT,
    "embedding" "Embedding" NOT NULL DEFAULT '2.5',
    "channel" "Channel" NOT NULL DEFAULT 'lab',
    "scale" INTEGER NOT NULL DEFAULT 4,
    "alpha" INTEGER NOT NULL DEFAULT 8,
    "isMass" BOOLEAN NOT NULL DEFAULT false,
    "unit" INTEGER NOT NULL DEFAULT 1,
    "amount" INTEGER NOT NULL DEFAULT 1,
    "dpi" INTEGER NOT NULL DEFAULT 300,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTranslations" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "cnInfo" JSONB,

    CONSTRAINT "ProductTranslations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductHistories" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER,
    "projectId" INTEGER,
    "userId" INTEGER,
    "userCode" INTEGER,
    "code" INTEGER NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "sourceImage" TEXT,
    "labcodeImage" TEXT,
    "url" TEXT,
    "urlPurchase" TEXT,
    "urlCustom" TEXT,
    "urlInstagram" TEXT,
    "embedding" "Embedding" NOT NULL DEFAULT '2.5',
    "channel" "Channel" NOT NULL DEFAULT 'lab',
    "scale" INTEGER NOT NULL DEFAULT 4,
    "alpha" INTEGER NOT NULL DEFAULT 8,
    "isMass" BOOLEAN NOT NULL DEFAULT false,
    "unit" INTEGER DEFAULT 1,
    "amount" INTEGER DEFAULT 1,
    "dpi" INTEGER DEFAULT 300,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "ProductHistories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrintInfos" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER NOT NULL,
    "printType" TEXT,
    "printMethod" TEXT,
    "printingMaterial" TEXT,
    "printCompany" TEXT,
    "printCopperCompany" TEXT,
    "printDate" TIMESTAMP(3),
    "printOrder" INTEGER,

    CONSTRAINT "ProductPrintInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInfoGroups" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "teamId" INTEGER,
    "productId" INTEGER,
    "title" TEXT NOT NULL,
    "productInfoIds" INTEGER[],

    CONSTRAINT "ProductInfoGroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductInfos" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER,
    "productInfoGroupId" INTEGER,
    "title" TEXT,
    "type" "ProductInfoType" DEFAULT 'text',
    "text" TEXT,
    "number" INTEGER,
    "date" TIMESTAMP(3),
    "boolean" BOOLEAN,
    "url" TEXT,
    "image" TEXT,
    "order" INTEGER,

    CONSTRAINT "ProductInfos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scans" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "productId" INTEGER,
    "projectId" INTEGER,
    "teamId" INTEGER,
    "industryId" INTEGER,
    "mainCategoryId" INTEGER,
    "subCategoryId" INTEGER,
    "deviceId" TEXT NOT NULL,
    "deviceInfo" JSONB,

    CONSTRAINT "Scans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EcoScans" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "deviceId" TEXT,
    "deviceInfo" JSONB,
    "industryId" INTEGER,
    "mainCategoryId" INTEGER,
    "subCategoryId" INTEGER,
    "teamId" INTEGER,
    "projectId" INTEGER,
    "productId" INTEGER,

    CONSTRAINT "EcoScans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banners" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "bannerImageUrl" TEXT,
    "bannerOriginalName" TEXT,
    "bannerMovieUrl" TEXT,

    CONSTRAINT "Banners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contractors" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "code" INTEGER NOT NULL,
    "logoImageUrl" TEXT,
    "contractorName" TEXT,

    CONSTRAINT "Contractors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiries" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Inquiries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tests" (
    "id" SERIAL NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "versionId" INTEGER NOT NULL,
    "versionCode" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "countryCode" INTEGER NOT NULL,
    "industryId" INTEGER NOT NULL,
    "industryCode" INTEGER NOT NULL,
    "teamId" INTEGER NOT NULL,
    "teamCode" INTEGER NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teams_apiKey_apiSecret_key" ON "Teams"("apiKey", "apiSecret");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Versions_code_key" ON "Versions"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTranslations_productId_key" ON "ProductTranslations"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductPrintInfos_productId_key" ON "ProductPrintInfos"("productId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Countries" ADD CONSTRAINT "Countries_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Industries" ADD CONSTRAINT "Industries_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MainCategories" ADD CONSTRAINT "MainCategories_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubCategories" ADD CONSTRAINT "SubCategories_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Projects" ADD CONSTRAINT "Projects_bmId_fkey" FOREIGN KEY ("bmId") REFERENCES "Bms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTranslations" ADD CONSTRAINT "ProductTranslations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHistories" ADD CONSTRAINT "ProductHistories_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHistories" ADD CONSTRAINT "ProductHistories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductHistories" ADD CONSTRAINT "ProductHistories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrintInfos" ADD CONSTRAINT "ProductPrintInfos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInfoGroups" ADD CONSTRAINT "ProductInfoGroups_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInfoGroups" ADD CONSTRAINT "ProductInfoGroups_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInfos" ADD CONSTRAINT "ProductInfos_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductInfos" ADD CONSTRAINT "ProductInfos_productInfoGroupId_fkey" FOREIGN KEY ("productInfoGroupId") REFERENCES "ProductInfoGroups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scans" ADD CONSTRAINT "Scans_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EcoScans" ADD CONSTRAINT "EcoScans_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Versions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Countries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_industryId_fkey" FOREIGN KEY ("industryId") REFERENCES "Industries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
