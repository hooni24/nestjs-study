import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {

  // Repository 클래스 DI
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) { }

  /**
   * 전체 게시물 반환
   * @returns 
   */
  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  /**
   * 새로운 게시물 작성
   * @param title 게시물 제목
   * @param description 게시물 내용
   * @returns 생성된 게시물 객체
   */
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  /**
   * id로 게시물 하나 찾기
   * @param id 찾을 게시물의 id
   * @returns 찾은 게시물
   */
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find board with id ${id}`);
    }
    return found;
  }

  /**
   * id로 게시물 하나 지우기
   * @param id 삭제할 게시물 id
   */
  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  /**
   * id에 해당하는 게시물 status 변경하기
   * @param id 
   * @param status 
   * @returns 
   */
  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardById(id);
    board.status = status;
    await this.boardRepository.save(board);
    return board;
  }

}
