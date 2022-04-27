import mitt from 'mitt';

type EventsType = {
  seedIsSet: number;
  correctAnswerIsSent: string;
  numberleConfigIsSent: {
    maxNumberOfTries: number;
    maxNumberOfInput: number;
  };
};
export const emitter = mitt<EventsType>();
