/* eslint-disable quotes */

/**
 * @constant notificationTranslations - The translations for the notifications
 * @type {object}
 * @property {object} en - The English translations
 * @property {object} ua - The Ukrainian translations
 * @property {object} notification - The notification translations
 */
export const notificationTranslations = {
  en: {
    notification: {
      title: {
        Success: 'Success',
        Error: 'Error',
      },
      UserSuccessfullyUpdated: 'User successfully updated!',
      UserSuccessfullyDisabled: 'User successfully disabled!',
      SomethingWentWrong: 'Something went wrong',
      MessageWasNotSent: 'Message was not sent to mail',
      MessageWasSent: 'Message was sent to your mail',
      CodeIsValid: 'Code is valid',
      CodeIsNotValid: 'Code is not valid',
      PasswordSuccessfullyChanged: 'Password is successfully changed!',
      FailedChangePassword: 'Failed to change password',
      PasswordNotMatch: 'Password does not match',
      PasswordNotReliable: 'Password is not reliable',
      CanNotFetchUsers: 'Something went wrong! Cannot fetch users.',
      CanNotFetchUser: 'Something went wrong! Cannot fetch user.',
      CanNotFetchExercises: 'Something went wrong! Cannot fetch exercises.',
      CanNotFetchTrainings: 'Something went wrong! Cannot fetch trainings.',
      CanNotDisableUser: 'Something went wrong! Cannot disable user.',
      UserSuccessfullyCreated: 'User successfully created!',
      TrainingSuccessfullyCreated: 'Training successfully created!',
      CannotCreateUser: 'Something went wrong! Cannot create user.',
      CannotCreateTraining: 'Something went wrong! Cannot create training.',
      CannotUpdateUser: 'Something went wrong! Cannot update user.',
      UserSuccessfullyDeleted: 'User successfully deleted!',
      CannotDeleteUser: 'Something went wrong! Cannot delete user.',
      'Reports successfully sended': 'Reports successfully sended',
      'Cannot send reports': 'Something went wrong! Cannot send reports',
      SelectChart: 'Please select at least one chart to send report.',
      SelectDateRangeReport: 'Please select date range for report.',
      ReportSent: 'Report has been sent.',
      ErrorReport: 'Something went wrong! Cannot send report.',
      ErrorFetchUser: 'Something went wrong! Cannot fetch user.',
      ChartContainerNotFound: 'Chart container not found',
      SharedSuccess: 'Month report shared successfully',
      FailedToShare: 'Failed to share month report',
      ErrorFetchTrainings: 'Something went wrong! Cannot fetch training data.',
      TrainingsNotFound: 'Trainings are not found',
      'Mail was successfully sent': 'Mail was successfully sent',
      'Can not send mail': 'Can not send mail',
      'Mail template was successfully saved':
        'Mail template was successfully saved',
      'Can not save mail template': 'Can not save mail template',
      'Mail Template was successfully loaded':
        'Mail Template was successfully loaded',
      'Can not load mail template': 'Can not load mail template',
      'Template does not selected': 'Template does not selected',
      'Can not upload photo': 'Can not upload photo',
      'An error occurred while checking token':
        'An error occurred while checking token',
      'Password is successfully created!': 'Password is successfully created!',
      'Failed to set password': 'Failed to set password',
      InvalidDate: "You can't create report in the future!",
      CanNotActivateUser: 'Something went wrong! Cannot activate user.',
      UserSuccessfullyActivated: 'User successfully activated!',
      PhoneNumberIsRequired: 'Phone number is required',
      'New password cannot be the same as the old one':
        'New password cannot be the same as the old one',
      'User not found': 'User not found',
      'Reset token not found or expired': 'Reset token not found or expired',
      'Please provide reset token and password':
        'Please provide reset token and password',
      'User with such email not found': 'User with such email not found',
    },
  },
  ua: {
    notification: {
      title: {
        Success: 'Успіх',
        Error: 'Помилка',
      },
      UserSuccessfullyUpdated: 'Користувач успішно оновлений!',
      UserSuccessfullyDisabled: 'Користувач успішно відключений!',
      SomethingWentWrong: 'Щось пішло не так',
      MessageWasNotSent: 'Повідомлення не було надіслано на пошту',
      MessageWasSent: 'Повідомлення було надіслане на пошту',
      CodeIsValid: 'Валідний код',
      CodeIsNotValid: 'Код не валідний',
      PasswordSuccessfullyChanged: 'Пароль успішно змінений',
      FailedChangePassword: 'Не вдалось змінити пароль',
      PasswordNotMatch: 'Паролі не співпадають',
      PasswordNotReliable: 'Пароль ненадійний',
      CanNotFetchUsers: 'Щось пішло не так! Неможливо отримати користувачів.',
      CanNotFetchUser: 'Щось пішло не так! Неможливо отримати користувача.',
      CanNotFetchExercises: 'Щось пішло не так! Неможливо отримати вправи.',
      CanNotFetchTrainings: 'Щось пішло не так! Неможливо отримати тренування.',
      CanNotDisableUser: 'Щось пішло не так! Неможливо відключити користувача.',
      UserSuccessfullyCreated: 'Користувач успішно створений!',
      TrainingSuccessfullyCreated: 'Тренування успішно створене!',
      CannotCreateUser: 'Щось пішло не так! Неможливо створити користувача.',
      CannotCreateTraining: 'Щось пішло не так! Неможливо створити тренування.',
      CannotUpdateUser: 'Щось пішло не так! Неможливо оновити користувача.',
      UserSuccessfullyDeleted: 'Користувач успішно оновлений!',
      CannotDeleteUser: 'Щось пішло не так! Неможливо видалити користувача.',
      'Reports successfully sended': 'Звіти успішно надіслані',
      'Cannot send reports': 'Щось пішло не так. Неможливо надіслати звіти!',
      SelectChart:
        'Будь ласка, виберіть принаймні одну діаграму для відправлення звіту.',
      SelectDateRangeReport: 'Будь ласка, виберіть діапазон дат для звіту.',
      ReportSent: 'Звіт надіслано.',
      ErrorReport: 'Щось пішло не так! Неможливо відправити звіт.',
      ErrorFetchUser: 'Щось пішло не так! Неможливо отримати користувача.',
      ChartContainerNotFound: 'Контейнер для графіку не знайдено',
      SharedSuccess: 'Ви успішно поділились звітом за місяць',
      FailedToShare: 'Помилка при відправленні звіту за місяць',
      ErrorFetchTrainings:
        'Щось пішло не так! Неможливо отримати дані про тренування.',
      TrainingsNotFound: 'Тренування не знайдені',
      'Mail was successfully sent': 'Повідомлення успішно надіслане',
      'Can not send mail': 'Неможливо надіслати повідомлення',
      'Mail template was successfully saved': 'Шаблон був успішно збережений',
      'Can not save mail template': 'Неможливо зберегти шаблон',
      'Mail Template was successfully loaded':
        'Шаблон був успішно завантажений',
      'Can not load mail template': 'Неможливо завантажити шаблон',
      'Template does not selected': 'Шаблон не вибрано',
      'Can not upload photo': 'Неможливо завантажити фото',
      'An error occurred while checking token':
        'Виникла помилка при перевірці токена',
      'Password is successfully created!': 'Пароль успішно створений!',
      'Failed to set password': 'Не вийшло встановити пароль',
      InvalidDate: 'Ви не можете створити звіт на майбутнє!',
      CanNotActivateUser:
        'Щось пішло не так! Неможливо активувати користувача.',
      UserSuccessfullyActivated: 'Користувач успішно активований!',
      PhoneNumberIsRequired: 'Номер телефону обов’язковий',
      'New password cannot be the same as the old one':
        'Новий пароль не може бути таким самим, як і старий',
      'User not found': 'Користувач не знайдений',
      'Reset token not found or expired':
        'Токен скидання не знайдено або прострочено',
      'Please provide reset token and password':
        'Будь ласка, надайте токен скидання та пароль',
      'User with such email not found':
        'Користувача з такою електронною адресою не знайдено',
    },
  },
};
