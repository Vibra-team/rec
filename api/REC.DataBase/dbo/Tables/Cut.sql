CREATE TABLE [dbo].[Cut] (
    [IdClip]   INT             NULL,
    [IdVideo]  INT             NULL,
    [Start]    DECIMAL (18, 3) NULL,
    [Finish]   DECIMAL (18, 3) NULL,
    [Sequence] INT             NULL,
    CONSTRAINT [FK_Cuts_Clip] FOREIGN KEY ([IdClip]) REFERENCES [dbo].[Clip] ([Id]),
    CONSTRAINT [FK_Cuts_Video] FOREIGN KEY ([IdVideo]) REFERENCES [dbo].[Video] ([Id])
);

