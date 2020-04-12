import * as types from '../_actions/_types/members.type';
import * as memberAction from '../_actions/member.action';
import { User } from 'src/app/models/user.model';

export interface State {
  loading: boolean;
  members: User[];
  member: User;
  error: string;
}

const initState: State = {
  loading: false,
  members: null,
  member: null,
  error: null
};

export const MemberReducer = (state = initState, action: memberAction.MemberActions) => {
  switch (action.type) {
    case types.MEMBER_LIST_START:
      return { ...state, loading: true, members: null, member: null, error: null };

    case types.MEMBER_LIST:
      return { ...state, loading: false, members: action.payload.members, member: null, error: null };

    case types.MEMBER_LIST_FAILED:
      return { ...state, loading: false, members: null, member: null, error: action.payload };

    case types.MEMBER_SHOW_START:
      return { ...state, loading: true, member: null, error: null };

    case types.MEMBER_SHOW:
      return { ...state, loading: false, member: action.payload.member, error: null };

    case types.MEMBER_SHOW_FAILED:
      return { ...state, loading: false, member: null, error: action.payload };

    case types.RESET_MEMBER_SHOW:
      return { ...state, loading: false, member: null, error: null };

    default:
        return state;
  }
};

