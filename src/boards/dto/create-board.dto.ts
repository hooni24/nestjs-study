/**
 * 게시물 작성시 이용될 dto
 *  -> interface로도 가능한데, nestjs에서는 class를 추천한다.
 */
export class CreateBoardDto {
  title: string;
  description: string;
}
