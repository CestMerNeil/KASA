﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace kommande_access_backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20241105141255_UpdateImagePathProducts")]
    partial class UpdateImagePathProducts
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Clicks")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Model")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<string>("ProductName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<string>("SerialNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Brand = "Apple",
                            Clicks = 5634,
                            Description = "Apple iPhone 14 Pro Max with 6.7-inch Super Retina XDR display, A16 Bionic chip, and 48MP camera system.",
                            Image = "https://perso.isima.fr/~aoxie/KASA/iphone-14-pro-max.jpg",
                            Model = "MQ8P3CH/A",
                            Price = 1199.99m,
                            ProductName = "iPhone 14 Pro Max",
                            SerialNumber = "SN10001",
                            Type = "phone"
                        },
                        new
                        {
                            Id = 2,
                            Brand = "Apple",
                            Clicks = 4270,
                            Description = "13.6-inch MacBook Air powered by M2 chip, featuring 8GB RAM and 256GB SSD storage.",
                            Image = "https://perso.isima.fr/~aoxie/KASA/macbook-air-m2.jpg",
                            Model = "MLY13CH/A",
                            Price = 999.99m,
                            ProductName = "MacBook Air M2",
                            SerialNumber = "SN10002",
                            Type = "laptop"
                        },
                        new
                        {
                            Id = 3,
                            Brand = "Samsung",
                            Clicks = 3321,
                            Description = "Samsung Galaxy S23 Ultra with 6.8-inch QHD+ display, Snapdragon 8 Gen 2, and a 200MP quad-camera system.",
                            Image = "https://perso.isima.fr/~aoxie/KASA/samsung-galaxy-s23-ultra.jpg",
                            Model = "SM-S9180",
                            Price = 1199.99m,
                            ProductName = "Samsung Galaxy S23 Ultra",
                            SerialNumber = "SN10003",
                            Type = "phone"
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
