import {colors} from './variables';

export const globalStyles = {
  scrollView: {
    width: '100%',
  },
  inputContainer: {
    backgroundColor: colors.whiteDark,
    paddingVertical: 16,
    paddingHorizontal: 12,
    maxWidth: '100%',
    borderRadius: 6,
    shadowColor: colors.blackLigth,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardShadow: {
    marginVertical: 4,
    borderColor: colors.lightGray,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  listContentContainer: {
    flex: 1,
    paddingTop: 16,
  },
  baseContainer: {
    flex: 1,
    width: '100%',
  },
};
