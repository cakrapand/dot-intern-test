import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
  async create(createPostDto: CreatePostDto, userId: number) {
    const newPost = this.postsRepository.create({
      ...createPostDto,
      userId,
    });
    return await this.postsRepository.save(newPost);
  }

  async findAll(userId: number) {
    return await this.postsRepository.find({ where: { userId: userId } });
  }

  async findOneById(id: number) {
    const post = await this.postsRepository.findOneBy({ id: id });
    if (!post) throw new NotFoundException();
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number) {
    const post = await this.findOneById(id);
    if (post.userId != userId) throw new UnauthorizedException();
    await this.postsRepository.update(id, updatePostDto);
    return await this.findOneById(id);
  }

  async remove(id: number, userId: number) {
    const post = await this.findOneById(id);
    if (post.userId != userId) throw new UnauthorizedException();
    await this.postsRepository.delete(id);
  }
}
