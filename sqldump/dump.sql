USE [master]
GO
/****** Object:  Database [db_rec]    Script Date: 24/03/2021 16:02:01 ******/
CREATE DATABASE [db_rec]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_rec', FILENAME = N'/var/opt/mssql/data/db_rec.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'db_rec_log', FILENAME = N'/var/opt/mssql/data/db_rec_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [db_rec] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_rec].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_rec] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_rec] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_rec] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_rec] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_rec] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_rec] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_rec] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_rec] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_rec] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_rec] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_rec] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_rec] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_rec] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_rec] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_rec] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_rec] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_rec] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_rec] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_rec] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_rec] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_rec] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_rec] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_rec] SET RECOVERY FULL 
GO
ALTER DATABASE [db_rec] SET  MULTI_USER 
GO
ALTER DATABASE [db_rec] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_rec] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_rec] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_rec] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [db_rec] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [db_rec] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'db_rec', N'ON'
GO
ALTER DATABASE [db_rec] SET QUERY_STORE = OFF
GO
USE [db_rec]
GO
/****** Object:  Table [dbo].[Campaign]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Campaign](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdChannel] [int] NULL,
	[Name] [nvarchar](250) NULL,
	[Active] [bit] NOT NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Author] [nvarchar](250) NULL,
	[Logo] [nvarchar](250) NULL,
	[Thumbnail] [nvarchar](250) NULL,
 CONSTRAINT [PK_Campaign] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CampaignSocialMedia]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CampaignSocialMedia](
	[IdCampaign] [int] NOT NULL,
	[IdSocialMedia] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Channel]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Channel](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Path] [nvarchar](255) NULL,
	[Active] [bit] NOT NULL,
	[ChannelType] [int] NULL,
	[Folder] [nvarchar](255) NULL,
	[Image] [nvarchar](255) NULL,
 CONSTRAINT [PK_Channel] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Clip]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Clip](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](250) NULL,
	[Description] [nvarchar](250) NULL,
	[Tags] [nvarchar](250) NULL,
	[Thumbnail] [nvarchar](250) NULL,
	[CreatedAt] [datetime] NOT NULL,
	[Status] [int] NULL,
	[Author] [nvarchar](250) NULL,
	[IdCampaign] [int] NULL,
	[Length] [decimal](18, 2) NULL,
	[Gif] [bit] NULL,
	[Size] [int] NULL,
	[SchedulingDate] [datetime] NULL,
	[AspectRatio] [nvarchar](50) NULL,
	[UploadedByUser] [bit] NULL,
 CONSTRAINT [PK_Clip] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ClipSocialMedia]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ClipSocialMedia](
	[IdClip] [int] NULL,
	[IdSocialMedia] [int] NULL,
	[Status] [int] NULL,
	[Link] [nvarchar](255) NULL,
	[Monetize] [bit] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cut]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cut](
	[IdClip] [int] NULL,
	[IdVideo] [int] NULL,
	[Start] [decimal](18, 3) NULL,
	[Finish] [decimal](18, 3) NULL,
	[Sequence] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SocialMedia]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SocialMedia](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](255) NULL,
	[Credential] [nvarchar](1000) NULL,
	[Active] [bit] NULL,
	[SocialMedia] [int] NULL,
 CONSTRAINT [PK_SocialMedia] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](250) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Video]    Script Date: 24/03/2021 16:02:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Video](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdChannel] [int] NULL,
	[FileName] [nvarchar](255) NULL,
	[FilePath] [nvarchar](255) NULL,
	[CreatedAt] [datetime] NULL,
 CONSTRAINT [PK_Video] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Channel] ON 
GO
INSERT [dbo].[Channel] ([Id], [Name], [Path], [Active], [ChannelType], [Folder], [Image]) VALUES (7, N'Band', N'Canais', 1, 2, N'Band', N'https://pubimg.band.uol.com.br/files/33e611e741cfc2fe81b8.png')
GO
INSERT [dbo].[Channel] ([Id], [Name], [Path], [Active], [ChannelType], [Folder], [Image]) VALUES (19, N'BandNews FM', N'Canais', 1, 1, N'bandnewsfm', N'https://pubimg.band.uol.com.br/files/2ac65a824d96e005c3e6.png')
GO
SET IDENTITY_INSERT [dbo].[Channel] OFF
GO
SET IDENTITY_INSERT [dbo].[Video] ON 
GO
INSERT [dbo].[Video] ([Id], [IdChannel], [FileName], [FilePath], [CreatedAt]) VALUES (16867, 7, N'video-24-03-2021_11-31-10.mp4', N'2021_03_24', CAST(N'2021-03-24T11:31:10.000' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Video] OFF
GO
ALTER TABLE [dbo].[Campaign] ADD  CONSTRAINT [DF_Campaign_Active]  DEFAULT ((0)) FOR [Active]
GO
ALTER TABLE [dbo].[Campaign] ADD  CONSTRAINT [DF_Campaign_CreatedAt]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Channel] ADD  CONSTRAINT [DF_Channel_Active]  DEFAULT ((0)) FOR [Active]
GO
ALTER TABLE [dbo].[Clip] ADD  CONSTRAINT [DF__Clip__CreatedAt__1B0907CE]  DEFAULT (getdate()) FOR [CreatedAt]
GO
ALTER TABLE [dbo].[Clip] ADD  CONSTRAINT [DF_Clip_Status]  DEFAULT ((0)) FOR [Status]
GO
ALTER TABLE [dbo].[Clip] ADD  CONSTRAINT [DF_Clip_Length]  DEFAULT ((0)) FOR [Length]
GO
ALTER TABLE [dbo].[Clip] ADD  CONSTRAINT [DF_Clip_Gif]  DEFAULT ((0)) FOR [Gif]
GO
ALTER TABLE [dbo].[Campaign]  WITH CHECK ADD  CONSTRAINT [FK_Campaign_Channel] FOREIGN KEY([IdChannel])
REFERENCES [dbo].[Channel] ([Id])
GO
ALTER TABLE [dbo].[Campaign] CHECK CONSTRAINT [FK_Campaign_Channel]
GO
ALTER TABLE [dbo].[CampaignSocialMedia]  WITH CHECK ADD  CONSTRAINT [FK_CampaignSocialMedia_Campaign] FOREIGN KEY([IdCampaign])
REFERENCES [dbo].[Campaign] ([Id])
GO
ALTER TABLE [dbo].[CampaignSocialMedia] CHECK CONSTRAINT [FK_CampaignSocialMedia_Campaign]
GO
ALTER TABLE [dbo].[CampaignSocialMedia]  WITH CHECK ADD  CONSTRAINT [FK_CampaignSocialMedia_SocialMedia] FOREIGN KEY([IdSocialMedia])
REFERENCES [dbo].[SocialMedia] ([Id])
GO
ALTER TABLE [dbo].[CampaignSocialMedia] CHECK CONSTRAINT [FK_CampaignSocialMedia_SocialMedia]
GO
ALTER TABLE [dbo].[Clip]  WITH CHECK ADD  CONSTRAINT [FK_Clip_Campaign] FOREIGN KEY([IdCampaign])
REFERENCES [dbo].[Campaign] ([Id])
GO
ALTER TABLE [dbo].[Clip] CHECK CONSTRAINT [FK_Clip_Campaign]
GO
ALTER TABLE [dbo].[ClipSocialMedia]  WITH CHECK ADD  CONSTRAINT [FK_ClipSocialMedia_Clip] FOREIGN KEY([IdClip])
REFERENCES [dbo].[Clip] ([Id])
GO
ALTER TABLE [dbo].[ClipSocialMedia] CHECK CONSTRAINT [FK_ClipSocialMedia_Clip]
GO
ALTER TABLE [dbo].[ClipSocialMedia]  WITH CHECK ADD  CONSTRAINT [FK_ClipSocialMedia_SocialMedia] FOREIGN KEY([IdSocialMedia])
REFERENCES [dbo].[SocialMedia] ([Id])
GO
ALTER TABLE [dbo].[ClipSocialMedia] CHECK CONSTRAINT [FK_ClipSocialMedia_SocialMedia]
GO
ALTER TABLE [dbo].[Cut]  WITH CHECK ADD  CONSTRAINT [FK_Cuts_Clip] FOREIGN KEY([IdClip])
REFERENCES [dbo].[Clip] ([Id])
GO
ALTER TABLE [dbo].[Cut] CHECK CONSTRAINT [FK_Cuts_Clip]
GO
ALTER TABLE [dbo].[Cut]  WITH CHECK ADD  CONSTRAINT [FK_Cuts_Video] FOREIGN KEY([IdVideo])
REFERENCES [dbo].[Video] ([Id])
GO
ALTER TABLE [dbo].[Cut] CHECK CONSTRAINT [FK_Cuts_Video]
GO
ALTER TABLE [dbo].[Video]  WITH CHECK ADD  CONSTRAINT [FK_Video_Channel] FOREIGN KEY([IdChannel])
REFERENCES [dbo].[Channel] ([Id])
GO
ALTER TABLE [dbo].[Video] CHECK CONSTRAINT [FK_Video_Channel]
GO
USE [master]
GO
ALTER DATABASE [db_rec] SET  READ_WRITE 
GO
