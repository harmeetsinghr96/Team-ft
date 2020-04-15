import { AuthEffets } from './_effects/auth.effext';
import { MemberEffects } from './_effects/member.effect';
import { TodoTaskEffects } from './_effects/todo-task.effect';



const CombinedEffets = [AuthEffets, MemberEffects, TodoTaskEffects];

export default CombinedEffets;
