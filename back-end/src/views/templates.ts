import dayjs from 'dayjs';
import 'dayjs/locale/uk';

export const greetingTemplate = (userName: string): string => `
  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333; font-family: 'Arial', sans-serif; text-align: center;">Привіт, ${userName}!</h2>
    <p style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Дякуємо, що обрали Hard & Smart, ${userName}. Ми раді вітати вас у нашій команді! Ваша підтримка для нас надзвичайно важлива.
    </p>
    <p style="font-size: 14px; color: #777; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Якщо у вас виникнуть питання або потрібна допомога, не соромтеся звертатися до нас. Ми тут, щоб допомогти!
    </p>
    <p style="font-size: 14px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      З найкращими побажаннями,<br/>
      Команда Hard & Smart
    </p>
  </div>
`;

export const verificationTemplate = (userName: string, link: string) => `
  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333; font-family: 'Arial', sans-serif; text-align: center;">Підтвердіть свою електронну пошту</h2>
    <p style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Дякуємо, ${userName}, за реєстрацію в Hard & Smart.
    </p>
    <p><a style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6; color: blue;" href="${link}">Для підтвердження електронної пошти, будь ласка, скористайтеся цим посиланням</a></p>
    <p style="font-size: 14px; color: #777; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Цей код дійсний протягом 30 хвилин. Якщо ви не реєструвалися в Hard & Smart, можете ігнорувати цей лист.
    </p>
    <p style="font-size: 14px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      З найкращими побажаннями,<br/>
      Команда Hard & Smart
    </p>
  </div>
`;

export const resetTemplate = (resetUrl: string) => `
  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333; font-family: 'Arial', sans-serif; text-align: center;">Скидання пароля</h2>
    <p style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Для скидання вашого пароля, будь ласка, перейдіть за наступним посиланням:
    </p>
    <p><a style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6; color: blue;" href="${resetUrl}">Натисніть тут, щоб скинути ваш пароль</a></p>
    <p style="font-size: 14px; color: #777; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Це посилання дійсне протягом 30 хвилин. Якщо ви не скидали свій пароль, можете безпечно ігнорувати цей лист.
    </p>
    <p style="font-size: 14px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      З найкращими побажаннями,<br/>
      Команда Hard & Smart
    </p>
  </div>
`;

export const changePasswordTemplate = (
  userName: string,
  verificationCode: string,
) => `
<div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
  <h2 style="color: #333; font-family: 'Arial', sans-serif; text-align: center;">Зміна пароля</h2>
  <p style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
    Привіт, ${userName}. Здається, ви хочете змінити свій пароль.
  </p>
  <p>Для зміни пароля введіть цей код підтвердження</p>
  <div style="text-align: center; font-size:  36px; font-family: 'Arial', sans-serif; color: #555;">
    <p>${verificationCode}</p>
  </div>
  <p style="font-size: 14px; color: #777; font-family: 'Arial', sans-serif; line-height: 1.6;">
    Цей код дійсний протягом 30 хвилин. Якщо ви не реєструвалися в GYM, можете безпечно ігнорувати цей лист.
  </p>
  <p style="font-size: 14px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
    З найкращими побажаннями,<br/>
    Команда Hard & Smart
  </p>
</div>
`;

export const monthReportTemplate = (
  userName: string,
  link: string,
  dates?: string,
) => {
  const correctData = dates
    ? `${dayjs(dates.split(',')[0]).locale('uk').format('DD MMMM')} - ${dayjs(
        dates.split(',')[1]
      )
        .locale('uk')
        .format('DD MMMM')}`
    : '';

  return `
  <div style="background-color: #f4f4f4; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333; font-family: 'Arial', sans-serif; text-align: center;">Звіт за місяць в спортзалі</h2>
    <p style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      Дякуємо, ${userName}, за відвідування нашого спортзалу. Ми склали звіт з вашими результатами ${correctData ? `за ці дати ${correctData}` : 'за цей місяць'}.
    </p>
    <p><a style="font-size: 16px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6; color: blue;" href="${link}">Для перегляду результатів, будь ласка, скористайтеся цим посиланням</a></p>
    <p style="font-size: 14px; color: #555; font-family: 'Arial', sans-serif; line-height: 1.6;">
      З найкращими побажаннями,<br/>
      Команда Hard & Smart
    </p>
  </div>
`;
};
