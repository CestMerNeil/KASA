FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY kommande-access-backend.csproj ./
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /app .
COPY products.db /app/products.db

EXPOSE 5000

CMD ["bash", "-c", "dotnet kommande-access-backend.dll && dotnet ef database update"]