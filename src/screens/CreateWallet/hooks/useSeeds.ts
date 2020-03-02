import {useGlobalState} from 'globalState';
import {useState, useEffect} from 'react';
import Wallet from 'erc20-wallet';

export function useSeeds(): [Array<string>, () => void, Array<string>] {
  const {seed} = Wallet;
  const seedsSorted = seed.split(' ');
  const [seedsSuffled, setSeedsSuffled] = useState(seedsSorted);

  const shuffleSeeds = () => {
    const n = seedsSorted.length;
    let tempArr = [];

    for (let index = 0; index < n - 1; index++) {
      tempArr.push(
        seedsSorted.splice(
          Math.floor(Math.random() * seedsSorted.length),
          1,
        )[0],
      );
    }
    tempArr.push(seedsSorted[0]);
    setSeedsSuffled(tempArr);
  };
  return [seedsSorted, shuffleSeeds, seedsSuffled];
}
