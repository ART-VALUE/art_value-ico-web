import BN from "bn.js";
import { ChainId } from "./service/eth/networks";

export default {
  etherToAddress: '0x9306DEF3aE932e4959a725Cd3B4f323435265d5c',
  frontend: {
    chainId: 1 as ChainId,
    minimumConfirmations: 5 // 4 on backend as buffer
  },
  stages: {
    presale: {
      minAmount: new BN('20000'),
      depositPercentage: new BN('20')
    }
  }
}
