export const colors = {
  white: '#ffffff',
  black: '#000000',
  grey: 'grey',
  transparent: 'transparent',
  placeholderColor: 'rgba(225,225,225,0.9)',
  inputColor: 'rgba(225,225,225,0.2)'
}

export const commonStyles = {
  buttonContainer: {
    backgroundColor: colors.black,
    borderRadius: 15,
    paddingVertical: 15,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedButtonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 5,
    width: 100,
  },
  selectedButtonText: {
    color: colors.black,
    fontWeight: '700',
    textAlign: 'center',
  },
}
