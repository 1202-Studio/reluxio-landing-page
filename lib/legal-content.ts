/**
 * Legal documents (Terms of Service + Privacy Policy), bilingual vi/en.
 *
 * Single source of truth rendered by app/(legal)/terms and /privacy — and
 * mirrored (copied) into the reluxio-landing-page repo. Keep the two copies in
 * sync when editing.
 *
 * NOTE: this is an operator-provided template, not legal advice. Have it
 * reviewed before relying on it, and replace the operator/contact details
 * below when the business entity changes.
 */

export const LEGAL_CONTACT_EMAIL = "binhnt.010896@gmail.com";
export const LEGAL_UPDATED = "2026-07-11";

export type LegalSection = { heading: string; body: string[] };
export type LegalDoc = {
  title: string;
  updatedLabel: string;
  intro: string;
  sections: LegalSection[];
};

export type LegalLocale = "vi" | "en";

export const legalContent: Record<
  LegalLocale,
  { terms: LegalDoc; privacy: LegalDoc }
> = {
  vi: {
    terms: {
      title: "Điều khoản sử dụng",
      updatedLabel: `Cập nhật lần cuối: ${LEGAL_UPDATED}`,
      intro:
        "Điều khoản này áp dụng cho việc sử dụng Reluxio — nền tảng quản lý bán hàng dành cho người bán và người kinh doanh lại (reseller) tại Việt Nam, bao gồm quản lý kho hàng, đơn hàng, tài chính và trang gian hàng công khai. Bằng việc tạo tài khoản hoặc sử dụng dịch vụ, bạn đồng ý với các điều khoản dưới đây.",
      sections: [
        {
          heading: "1. Dịch vụ",
          body: [
            "Reluxio cung cấp công cụ quản lý nội bộ cho cửa hàng: kho hàng, đơn hàng, khách hàng, sổ thu chi và trang gian hàng công khai để kết nối giữa các người bán với nhau (merchant-to-merchant).",
            "Reluxio không phải là sàn thương mại điện tử dành cho người tiêu dùng: nền tảng không xử lý thanh toán mua bán hàng hoá giữa các bên. Mọi giao dịch mua bán hàng hoá được thực hiện trực tiếp giữa người bán và người mua, ngoài phạm vi của Reluxio.",
          ],
        },
        {
          heading: "2. Tài khoản",
          body: [
            "Bạn phải cung cấp thông tin chính xác khi đăng ký và có trách nhiệm bảo mật thông tin đăng nhập của mình. Mọi hoạt động phát sinh từ tài khoản của bạn được xem là do bạn thực hiện.",
            "Bạn phải đủ 18 tuổi và có năng lực hành vi dân sự đầy đủ để sử dụng dịch vụ.",
          ],
        },
        {
          heading: "3. Gói dịch vụ và thanh toán",
          body: [
            "Reluxio có gói miễn phí (giới hạn tính năng) và gói Premium trả phí theo kỳ. Giá và thời hạn của gói Premium được hiển thị trong ứng dụng tại thời điểm thanh toán.",
            "Thanh toán được thực hiện bằng chuyển khoản ngân hàng với nội dung chứa mã thanh toán do hệ thống cấp. Gói Premium KHÔNG tự động gia hạn và không tự động trừ tiền: khi hết hạn, tài khoản trở về gói miễn phí trừ khi bạn chủ động thanh toán kỳ mới.",
            "Khoản thanh toán đã xác nhận không được hoàn lại, trừ trường hợp chuyển nhầm/chuyển trùng — vui lòng liên hệ để được xử lý từng trường hợp, hoặc trường hợp pháp luật có quy định khác.",
          ],
        },
        {
          heading: "4. Nội dung và dữ liệu của bạn",
          body: [
            "Bạn giữ toàn quyền sở hữu dữ liệu nhập vào Reluxio (sản phẩm, hình ảnh, đơn hàng, khách hàng...). Bạn cấp cho Reluxio quyền lưu trữ và hiển thị dữ liệu đó ở mức cần thiết để vận hành dịch vụ — ví dụ hiển thị sản phẩm trên gian hàng công khai của bạn.",
            "Bạn chịu trách nhiệm về tính hợp pháp của hàng hoá và nội dung mình đăng tải. Nghiêm cấm đăng bán hàng giả, hàng nhái, hàng cấm hoặc hàng vi phạm quyền sở hữu trí tuệ.",
            "Gian hàng công khai (bao gồm tên cửa hàng, sản phẩm, giá) hiển thị cho mọi người truy cập. Số điện thoại và địa chỉ chỉ hiển thị khi bạn chủ động bật trong phần cài đặt.",
          ],
        },
        {
          heading: "5. Hành vi bị cấm",
          body: [
            "Không sử dụng dịch vụ để lừa đảo, phát tán nội dung vi phạm pháp luật, can thiệp trái phép vào hệ thống, truy cập dữ liệu của cửa hàng khác, hoặc gây quá tải hạ tầng một cách có chủ đích.",
          ],
        },
        {
          heading: "6. Tạm ngưng và chấm dứt",
          body: [
            "Chúng tôi có thể tạm khoá hoặc chấm dứt tài khoản vi phạm điều khoản, sau khi thông báo trước trừ trường hợp vi phạm nghiêm trọng. Bạn có thể ngừng sử dụng và yêu cầu xoá tài khoản bất kỳ lúc nào bằng cách liên hệ theo địa chỉ ở mục 9.",
          ],
        },
        {
          heading: "7. Miễn trừ trách nhiệm",
          body: [
            'Dịch vụ được cung cấp "nguyên trạng" (as is). Chúng tôi nỗ lực duy trì dịch vụ ổn định nhưng không cam kết dịch vụ không gián đoạn hoặc không có lỗi.',
            "Trong phạm vi pháp luật cho phép, trách nhiệm của Reluxio đối với mọi khiếu nại liên quan đến dịch vụ không vượt quá tổng số phí bạn đã thanh toán trong 12 tháng gần nhất.",
            "Reluxio không chịu trách nhiệm đối với giao dịch mua bán hàng hoá giữa các người dùng với nhau.",
          ],
        },
        {
          heading: "8. Thay đổi điều khoản",
          body: [
            "Chúng tôi có thể cập nhật điều khoản này. Thay đổi quan trọng sẽ được thông báo trong ứng dụng hoặc qua email trước khi có hiệu lực. Việc tiếp tục sử dụng dịch vụ sau đó được xem là chấp nhận điều khoản mới.",
          ],
        },
        {
          heading: "9. Luật áp dụng và liên hệ",
          body: [
            `Điều khoản này được điều chỉnh theo pháp luật Việt Nam. Mọi thắc mắc, khiếu nại hoặc yêu cầu vui lòng liên hệ: ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    privacy: {
      title: "Chính sách bảo mật",
      updatedLabel: `Cập nhật lần cuối: ${LEGAL_UPDATED}`,
      intro:
        "Chính sách này mô tả cách Reluxio thu thập, sử dụng và bảo vệ dữ liệu cá nhân khi bạn sử dụng dịch vụ.",
      sections: [
        {
          heading: "1. Dữ liệu chúng tôi thu thập",
          body: [
            "Thông tin tài khoản: địa chỉ email, mật khẩu (được băm — chúng tôi không lưu mật khẩu gốc), hoặc thông tin hồ sơ cơ bản từ Google nếu bạn đăng nhập bằng Google.",
            "Dữ liệu cửa hàng do bạn nhập: sản phẩm, hình ảnh, đơn hàng, thông tin khách hàng của bạn, thu chi, cấu hình gian hàng (bao gồm số điện thoại, địa chỉ nếu bạn cung cấp).",
            "Dữ liệu thanh toán: khi bạn thanh toán gói Premium bằng chuyển khoản, chúng tôi nhận thông báo giao dịch từ đối tác đối soát SePay gồm số tiền, nội dung chuyển khoản và mã tham chiếu. Chúng tôi KHÔNG thu thập hay lưu trữ số thẻ hoặc thông tin đăng nhập ngân hàng của bạn.",
          ],
        },
        {
          heading: "2. Mục đích sử dụng",
          body: [
            "Vận hành các tính năng của dịch vụ (quản lý kho, đơn hàng, tài chính, gian hàng), xác nhận thanh toán và gia hạn gói, hỗ trợ người dùng, gửi thông báo dịch vụ (ví dụ: sắp hết hạn gói Premium), và bảo đảm an toàn hệ thống.",
            "Chúng tôi không bán dữ liệu cá nhân của bạn cho bên thứ ba.",
          ],
        },
        {
          heading: "3. Dữ liệu hiển thị công khai",
          body: [
            "Nếu bạn bật gian hàng công khai, tên cửa hàng, mô tả, logo, sản phẩm và giá sẽ hiển thị cho mọi người truy cập. Số điện thoại và vị trí cửa hàng chỉ hiển thị khi bạn chủ động bật từng mục trong cài đặt gian hàng.",
          ],
        },
        {
          heading: "4. Lưu trữ và bên xử lý dữ liệu",
          body: [
            "Dữ liệu được lưu trữ trên hạ tầng Supabase (cơ sở dữ liệu đặt tại khu vực AWS Tokyo, Nhật Bản). Đăng nhập Google do Google cung cấp theo chính sách của Google. Thông báo giao dịch ngân hàng được xử lý qua SePay.",
            "Các đối tác trên chỉ xử lý dữ liệu ở mức cần thiết để cung cấp dịch vụ cho Reluxio.",
          ],
        },
        {
          heading: "5. Cookie",
          body: [
            "Chúng tôi chỉ dùng cookie thiết yếu: cookie phiên đăng nhập (Supabase Auth) và cookie ghi nhớ ngôn ngữ (NEXT_LOCALE). Không dùng cookie quảng cáo hay theo dõi của bên thứ ba.",
          ],
        },
        {
          heading: "6. Dữ liệu khách hàng của bạn",
          body: [
            "Thông tin khách hàng mà bạn nhập vào hệ thống (tên, số điện thoại, địa chỉ người mua...) thuộc trách nhiệm quản lý của bạn với tư cách người kiểm soát dữ liệu. Reluxio chỉ lưu trữ và hiển thị lại cho chính cửa hàng của bạn; dữ liệu này không hiển thị công khai và không chia sẻ cho cửa hàng khác.",
          ],
        },
        {
          heading: "7. Thời hạn lưu trữ và xoá dữ liệu",
          body: [
            "Dữ liệu được lưu trong suốt thời gian tài khoản còn hoạt động. Khi bạn yêu cầu xoá tài khoản, dữ liệu cửa hàng sẽ được xoá khỏi hệ thống trong thời gian hợp lý, trừ dữ liệu buộc phải lưu theo quy định pháp luật (ví dụ: chứng từ thanh toán).",
          ],
        },
        {
          heading: "8. Quyền của bạn",
          body: [
            `Bạn có quyền truy cập, chỉnh sửa, xuất hoặc yêu cầu xoá dữ liệu cá nhân của mình. Phần lớn dữ liệu có thể tự chỉnh sửa trong ứng dụng; với các yêu cầu khác, liên hệ ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: "9. Thay đổi chính sách và liên hệ",
          body: [
            `Chính sách này có thể được cập nhật; thay đổi quan trọng sẽ được thông báo trong ứng dụng hoặc qua email. Mọi câu hỏi về quyền riêng tư: ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
  },
  en: {
    terms: {
      title: "Terms of Service",
      updatedLabel: `Last updated: ${LEGAL_UPDATED}`,
      intro:
        "These terms govern your use of Reluxio — a back-office platform for merchants and resellers in Vietnam, covering inventory, orders, finance and a public storefront. By creating an account or using the service, you agree to the terms below.",
      sections: [
        {
          heading: "1. The service",
          body: [
            "Reluxio provides internal store-management tools: inventory, orders, customers, income/expense tracking, and a public storefront for merchant-to-merchant discovery.",
            "Reluxio is not a consumer marketplace: the platform does not process payments for goods between parties. All purchases of goods happen directly between seller and buyer, outside of Reluxio.",
          ],
        },
        {
          heading: "2. Accounts",
          body: [
            "You must provide accurate information when registering and are responsible for keeping your credentials secure. Activity under your account is deemed to be yours.",
            "You must be at least 18 years old and have full legal capacity to use the service.",
          ],
        },
        {
          heading: "3. Plans and payment",
          body: [
            "Reluxio offers a free tier (with feature limits) and a paid Premium plan billed per period. The Premium price and period are shown in the app at the time of payment.",
            "Payment is made by bank transfer using a system-issued payment code in the transfer memo. Premium does NOT auto-renew and no money is ever taken automatically: when it expires, the account reverts to the free tier unless you actively pay for a new period.",
            "Confirmed payments are non-refundable, except for mistaken or duplicate transfers — contact us and we will handle those case by case — or where the law requires otherwise.",
          ],
        },
        {
          heading: "4. Your content and data",
          body: [
            "You retain full ownership of the data you enter into Reluxio (products, photos, orders, customers, ...). You grant Reluxio the rights needed to store and display that data to operate the service — e.g. showing your products on your public storefront.",
            "You are responsible for the legality of the goods and content you post. Listing counterfeit, prohibited, or IP-infringing goods is strictly forbidden.",
            "Your public storefront (store name, products, prices) is visible to anyone. Your phone number and location are shown only if you explicitly enable them in settings.",
          ],
        },
        {
          heading: "5. Prohibited conduct",
          body: [
            "Do not use the service for fraud, to distribute unlawful content, to interfere with the system, to access other stores' data, or to deliberately overload the infrastructure.",
          ],
        },
        {
          heading: "6. Suspension and termination",
          body: [
            "We may suspend or terminate accounts that violate these terms, with prior notice except for serious violations. You may stop using the service and request account deletion at any time via the contact address in section 9.",
          ],
        },
        {
          heading: "7. Disclaimers and liability",
          body: [
            'The service is provided "as is". We strive for stable operation but do not guarantee uninterrupted or error-free service.',
            "To the extent permitted by law, Reluxio's total liability for any claim related to the service will not exceed the fees you paid in the preceding 12 months.",
            "Reluxio is not responsible for transactions in goods conducted between users.",
          ],
        },
        {
          heading: "8. Changes to these terms",
          body: [
            "We may update these terms. Material changes will be announced in the app or by email before taking effect. Continued use of the service afterwards constitutes acceptance.",
          ],
        },
        {
          heading: "9. Governing law and contact",
          body: [
            `These terms are governed by the laws of Vietnam. Questions, complaints or requests: ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      updatedLabel: `Last updated: ${LEGAL_UPDATED}`,
      intro:
        "This policy describes how Reluxio collects, uses and protects personal data when you use the service.",
      sections: [
        {
          heading: "1. Data we collect",
          body: [
            "Account information: email address, password (hashed — we never store the original), or basic profile information from Google if you sign in with Google.",
            "Store data you enter: products, photos, orders, your customers' details, income/expenses, storefront configuration (including phone number and location if you provide them).",
            "Payment data: when you pay for Premium by bank transfer, we receive a transaction notification from our reconciliation partner SePay containing the amount, transfer memo and reference code. We do NOT collect or store your card numbers or bank credentials.",
          ],
        },
        {
          heading: "2. How we use it",
          body: [
            "To operate the service's features (inventory, orders, finance, storefront), confirm payments and extend plans, provide support, send service notifications (e.g. Premium expiring soon), and keep the system secure.",
            "We do not sell your personal data to third parties.",
          ],
        },
        {
          heading: "3. Publicly visible data",
          body: [
            "If you enable your public storefront, your store name, description, logo, products and prices are visible to anyone. Your phone number and store location are shown only when you explicitly enable each of them in storefront settings.",
          ],
        },
        {
          heading: "4. Storage and processors",
          body: [
            "Data is stored on Supabase infrastructure (database hosted in the AWS Tokyo region, Japan). Google sign-in is provided by Google under Google's policies. Bank-transfer notifications are processed via SePay.",
            "These partners process data only as needed to provide their services to Reluxio.",
          ],
        },
        {
          heading: "5. Cookies",
          body: [
            "We use essential cookies only: the sign-in session cookie (Supabase Auth) and the language preference cookie (NEXT_LOCALE). No advertising or third-party tracking cookies.",
          ],
        },
        {
          heading: "6. Your customers' data",
          body: [
            "Customer information you enter into the system (buyer names, phone numbers, addresses, ...) is managed under your responsibility as the data controller. Reluxio only stores it and displays it back to your own store; it is never shown publicly or shared with other stores.",
          ],
        },
        {
          heading: "7. Retention and deletion",
          body: [
            "Data is kept for as long as your account is active. When you request account deletion, your store data is removed from the system within a reasonable time, except data we must retain by law (e.g. payment records).",
          ],
        },
        {
          heading: "8. Your rights",
          body: [
            `You may access, correct, export, or request deletion of your personal data. Most data can be edited directly in the app; for other requests, contact ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
        {
          heading: "9. Changes and contact",
          body: [
            `This policy may be updated; material changes will be announced in the app or by email. Privacy questions: ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
  },
};
