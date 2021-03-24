CREATE TABLE [dbo].[SocialMedia] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NULL,
    [Credential]  NVARCHAR (255) NULL,
    [Active]      BIT            NULL,
    [SocialMedia] INT            NULL
);

