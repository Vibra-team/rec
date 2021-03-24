CREATE TABLE [dbo].[Video] (
    [Id]        INT            IDENTITY (1, 1) NOT NULL,
    [IdChannel] INT            NULL,
    [FileName]  NVARCHAR (255) NULL,
    [FilePath]  NVARCHAR (255) NULL,
    [CreatedAt] DATETIME       NULL,
    CONSTRAINT [PK_Video] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_Video_Channel] FOREIGN KEY ([IdChannel]) REFERENCES [dbo].[Channel] ([Id])
);

