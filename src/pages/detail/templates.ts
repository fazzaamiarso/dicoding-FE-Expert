import { html } from "lit";
import { generateRandomAvatar } from "@/utils/generate-random-avatar";
import RestaurantAPI from "@/lib/restaurant-api";

export const menuItemTemplate = ({ name }: { name: string }) => html`
  <li class="detail__menu-item">
    <img src="https://via.placeholder.com/50" alt=${name} />
    <div>${name}</div>
  </li>
`;

export const reviewItemTemplate = ({
  name,
  content,
  publishedAt,
}: {
  name: string;
  content: string;
  publishedAt: string;
}) => {
  const avatarUrl = generateRandomAvatar(name);
  return html`<li class="review__item" data-testid="review-item">
    <img src=${avatarUrl} alt="" class="review__avatar" />
    <div class="review__content">
      <h4 class="review__reviewer">${name}</h4>
      <p class="review__date">${RestaurantAPI.formatDateToNativeDate(publishedAt)}</p>
      <p class="review__content">${content}</p>
    </div>
  </li>`;
};

export const reviewForm = ({ handleSubmit }: { handleSubmit: (e: SubmitEvent) => unknown }) => html`
  <form @submit="${handleSubmit}" class="review__form">
    <div class="review__input-container">
      <label for="customer-name" class="review__label">Name</label>
      <input
        id="customer-name"
        name="customer-name"
        type="text"
        class="review__input"
        autocomplete="off"
      />
    </div>
    <div class="review__input-container">
      <label for="customer-review" class="review__label">Write your review</label>
      <textarea
        class="review__input review__textarea"
        id="customer-review"
        name="customer-review"
        rows="${3}"
        placeholder="What are your thoughts about this restaurant?"
      ></textarea>
    </div>
    <button class="review__submit click-area">Submit</button>
  </form>
`;
