/**
 * 게시물 model을 interface로 선언
 *  -> 타입만을 정의한다.
 */
export interface Board {
  id: string;
  title: string;
  description: string;
  status: BoardStatus;
}

/* 게시물의 상태 enum */
export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}