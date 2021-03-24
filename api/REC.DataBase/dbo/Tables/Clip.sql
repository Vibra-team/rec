CREATE TABLE [dbo].[Clip] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Title]       NVARCHAR (250) NULL,
    [Description] NVARCHAR (250) NULL,
    [Tags]        NVARCHAR (250) NULL,
    [Thumbnail]   NVARCHAR (250) NULL,
    [CreatedAt]   DATETIME       DEFAULT (getdate()) NOT NULL,
    [Status]      INT            CONSTRAINT [DF_Clip_Status] DEFAULT ((0)) NULL,
    [IdUol]       INT            NULL,
    [IdYoutube]   INT            NULL,
    [IdTwitter]   INT            NULL,
    [IdFacebook]  INT            NULL,
    CONSTRAINT [PK_Clip] PRIMARY KEY CLUSTERED ([Id] ASC)
);



