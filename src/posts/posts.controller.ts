import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto, createPostSchema } from './dto/create-post.dto';
import { UpdatePostDto, updatePostSchema } from './dto/update-post.dto';
import { Request } from 'express';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createPostSchema)) createPostDto: CreatePostDto,
    @Req() req: Request,
  ) {
    return await this.postsService.create(createPostDto, +req.user.id);
  }

  @Get()
  async findAll(@Req() req: Request) {
    return await this.postsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOneById(@Param('id') id: number) {
    return await this.postsService.findOneById(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updatePostSchema)) updatePostDto: UpdatePostDto,
    @Req() req: Request,
  ) {
    return await this.postsService.update(id, updatePostDto, +req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req: Request) {
    return await this.postsService.remove(id, req.user.id);
  }
}
