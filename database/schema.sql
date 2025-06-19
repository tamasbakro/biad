-- Create the database
CREATE DATABASE AdventistaEgyhaz;
GO

USE AdventistaEgyhaz;
GO

-- Create Users table
CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    Username NVARCHAR(50) NOT NULL UNIQUE,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    FirstName NVARCHAR(50),
    LastName NVARCHAR(50),
    Role NVARCHAR(20) DEFAULT 'member',
    CreatedAt DATETIME DEFAULT GETDATE(),
    LastLogin DATETIME
);
GO

-- Create Events table
CREATE TABLE Events (
    EventID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    EventDate DATETIME NOT NULL,
    Location NVARCHAR(200),
    Category NVARCHAR(50),
    CreatedBy INT FOREIGN KEY REFERENCES Users(UserID),
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);
GO

-- Create BlogPosts table
CREATE TABLE BlogPosts (
    PostID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    AuthorID INT FOREIGN KEY REFERENCES Users(UserID),
    CreatedAt DATETIME DEFAULT GETDATE(),
    UpdatedAt DATETIME,
    IsPublished BIT DEFAULT 0,
    Category NVARCHAR(50)
);
GO

-- Create Gallery table
CREATE TABLE Gallery (
    ImageID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(100),
    Description NVARCHAR(MAX),
    ImagePath NVARCHAR(255) NOT NULL,
    Category NVARCHAR(50),
    UploadedBy INT FOREIGN KEY REFERENCES Users(UserID),
    UploadDate DATETIME DEFAULT GETDATE()
);
GO

-- Create ContactMessages table
CREATE TABLE ContactMessages (
    MessageID INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Subject NVARCHAR(200),
    Message NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    IsRead BIT DEFAULT 0
);
GO

-- Create NewsletterSubscribers table
CREATE TABLE NewsletterSubscribers (
    SubscriberID INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    SubscribedAt DATETIME DEFAULT GETDATE(),
    IsActive BIT DEFAULT 1
);
GO

-- Create WorshipSchedule table
CREATE TABLE WorshipSchedule (
    ScheduleID INT IDENTITY(1,1) PRIMARY KEY,
    DayOfWeek NVARCHAR(20) NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    Description NVARCHAR(200),
    IsActive BIT DEFAULT 1
);
GO

-- Insert default worship schedule
INSERT INTO WorshipSchedule (DayOfWeek, StartTime, EndTime, Description)
VALUES 
    ('Szombat', '09:00', '12:00', 'Szombati istentisztelet'),
    ('Szombat', '17:00', '18:00', 'Szombati esti istentisztelet'),
    ('Szerda', '18:00', '19:00', 'Szerdai istentisztelet'),
    ('Péntek', '18:00', '19:00', 'Pénteki istentisztelet');
GO 