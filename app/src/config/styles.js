export const colors = {
  white: '#F7F7F7',
  purewhite: '#FFFFFF',
  black: '#000000',
  deepgreen: '#686d3b',
  grey: 'grey',
  transparent: 'transparent',
  placeholderColor: 'rgba(225,225,225,0.9)',
  inputColor: 'rgba(225,225,225,0.2)'
}

export const commonStyles = {
  buttonContainer: {
    backgroundColor: colors.deepgreen,
    borderRadius: 15,
    paddingVertical: 15,
    margin: 5
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedButtonContainer: {
    backgroundColor: colors.white,
    borderWidth: 0.5,
    borderColor: colors.deepgreen,
    borderRadius: 15,
    margin: 5,
    paddingVertical: 15
  },
  selectedButtonText: {
    color: colors.deepgreen,
    fontWeight: '700',
    textAlign: 'center',
  },
}
