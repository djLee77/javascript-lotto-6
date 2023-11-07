const MIN_WINNING_NUMBER = 1;
const MAX_WINNING_NUMBER = 45;
const ERROR_MESSAGES = {
  NATURAL_NUMBER: (subject) => `[ERROR] ${subject} 자연수로 입력해주세요.\n`,
  NUMBER_RANGE: (subject) =>
    `[ERROR] ${subject} ${MIN_WINNING_NUMBER}부터 ${MAX_WINNING_NUMBER}사이의 값을 입력해주세요.\n`,
  MIN_AMOUNT: "[ERROR] 구입금액은 최소 1000원부터 가능합니다.\n",
  AMOUNT_UNIT: "[ERROR] 구입금액은 1,000원 단위만 가능합니다.\n",
  WINNING_NUMBER_COUNT:
    "[ERROR] 당첨 번호는 쉼표(,)로 구분하여 6개 입력해주세요.\n",
  DUPLICATE_NUMBER: "[ERROR] 번호들 중 중복된 값이 존재합니다.\n",
  BONUS_NUMBER_DUPLICATE:
    "[ERROR] 당첨 번호들 중 보너스 번호와 중복된 값이 존재합니다.\n",
};

class ValidateInput {
  static validateNaturalNumber(number, subject) {
    if (isNaN(number) || number < MIN_WINNING_NUMBER || number % 1 !== 0) {
      throw new Error(ERROR_MESSAGES.NATURAL_NUMBER(subject));
    }
  }

  static validateAmount(amount) {
    ValidateInput.validateNaturalNumber(amount, "구입 금액은");

    if (amount < 1000) {
      throw new Error(ERROR_MESSAGES.MIN_AMOUNT);
    }

    if (amount > 1000 && amount % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES.AMOUNT_UNIT);
    }
  }

  static validateWinningNumber(numbers) {
    const subject = "당첨 번호는";
    if (numbers.length !== 6) {
      throw new Error(ERROR_MESSAGES.WINNING_NUMBER_COUNT);
    }

    const set = new Set(numbers);
    if (numbers.length !== set.size) {
      throw new Error(ERROR_MESSAGES.DUPLICATE_NUMBER);
    }

    numbers.forEach((number) => {
      ValidateInput.validateNaturalNumber(number, subject);
    });

    if (
      numbers.some(
        (number) => number < MIN_WINNING_NUMBER || number > MAX_WINNING_NUMBER,
      )
    ) {
      throw new Error(ERROR_MESSAGES.NUMBER_RANGE(subject));
    }
  }

  static validateBonusNumber(number, winningNumber) {
    const subject = "보너스 번호는";
    ValidateInput.validateNaturalNumber(number, subject);

    if (number < MIN_WINNING_NUMBER || number > MAX_WINNING_NUMBER) {
      throw new Error(ERROR_MESSAGES.NUMBER_RANGE(subject));
    }

    if (winningNumber.some((item) => item === number)) {
      throw new Error(ERROR_MESSAGES.BONUS_NUMBER_DUPLICATE);
    }
  }
}

export default ValidateInput;
