import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

import { BrandsService } from './brands.service';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private brandService: BrandsService,
  ) {}

  findAll() {
    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      relations: ['brand'],
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // creando asignando uno a uno las propiedades
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.image;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;

    // creando en base al DTO
    const newProduct = await this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandService.findOne(data.brandId);
      newProduct.brand = brand;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandService.findOne(changes.brandId);
      product.brand = brand;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
