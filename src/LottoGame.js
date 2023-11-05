import Lotto from "./Lotto.js";

class LottoGame {
  /*
    myLotto == [[로또 번호 6개], [로또 번호 6개] , ~구입 개수]
    winningLotto == {win : [당첨 번호 6개], bonus : 당첨번호}
  */
  constructor(myLotto, winningLotto) {
    this.lottos = myLotto.map((numbers) => new Lotto(numbers, winningLotto));
  }
}

export default LottoGame;