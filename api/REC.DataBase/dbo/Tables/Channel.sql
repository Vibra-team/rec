CREATE TABLE [dbo].[Channel] (
    [Id]          INT            IDENTITY (1, 1) NOT NULL,
    [Name]        NVARCHAR (255) NULL,
    [Path]        NVARCHAR (255) NULL,
    [Active]      BIT            CONSTRAINT [DF_Channel_Active] DEFAULT ((0)) NOT NULL,
    [ChannelType] INT            NULL,
    [Folder]      NVARCHAR (255) NULL,
    CONSTRAINT [PK_Channel] PRIMARY KEY CLUSTERED ([Id] ASC)
);







