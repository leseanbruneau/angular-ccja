export interface SprintModel {
  id: number,
  sprintnbr: number,
  sprinttitle: string,
  sprintgoals?: Array<string>,
  sprintreview?: Array<string>,
  techdebt?: Array<string>,
  showSprintDetails?: boolean,
  days?: Array<{
    id?: number,
    sprintDay: number,
    challengeDay: number,
    date: string,
    dayNotes: Array<string>
  }>
}
