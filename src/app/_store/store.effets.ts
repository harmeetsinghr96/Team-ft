import { AuthEffets } from './_effects/auth.effext';
import { MemberEffects } from './_effects/member.effect';



const CombinedEffets = [AuthEffets, MemberEffects];

export default CombinedEffets;
