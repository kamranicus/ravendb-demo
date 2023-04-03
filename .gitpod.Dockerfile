FROM gitpod/workspace-dotnet:latest
FROM mcr.microsoft.com/dotnet/sdk:3.1 AS build-env
FROM mcr.microsoft.com/dotnet/aspnet:3.1
ENV RAVENDEMO_Database__Urls__0="http://live-test.ravendb.net" RAVENDEMO_Database__Name="Demo" RAVENDEMO_ConferenceMode=false RAVENDEMO_GoogleTagManager__ContainerId=""
