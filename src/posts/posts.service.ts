import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    return await this.postsRepository.save(newPost);
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOneById(id: number) {
    return await this.postsRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update(id, updatePostDto);
    return await this.findOneById(id);
  }

  async remove(id: number) {
    await this.postsRepository.delete(id);
  }
}
