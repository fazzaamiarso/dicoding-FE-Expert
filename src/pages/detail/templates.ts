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
  return html`<li class="review__item">
    <img src=${avatarUrl} alt="" class="review__avatar" />
    <div class="review__content">
      <h4 class="review__reviewer">${name}</h4>
      <p class="review__date">${RestaurantAPI.formatDateToNativeDate(publishedAt)}</p>
      <p class="review__content">${content}</p>
    </div>
  </li>`;
};
