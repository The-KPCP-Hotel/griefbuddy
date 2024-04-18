-- CreateTable
CREATE TABLE "LocationRequest" (
    "id" SERIAL NOT NULL,
    "sender" TEXT,
    "recipient" TEXT,
    "isAccepted" TEXT,
    "haveArrived" TEXT,
    "closeMeeting" TEXT,

    CONSTRAINT "LocationRequest_pkey" PRIMARY KEY ("id")
);
