# CSS

## Media Queries

**Screen width**

&nbsp;&nbsp;These are **standard breakpoints**, but u dont need to use them all the time.

- **Small** : 576px ~ 768px
- **Medium** : 768px ~ 992px
- **Large** : 992px ~ 1200px
- **XLarge** : 1200px and above

&nbsp;&nbsp;To combine 2 media queries - use **_and_**

```css
@media (min-width: 576px) and (max-width: 768px) {
  ...;
}
```

&nbsp;&nbsp;You can also use **Orientation** in media queries

```css
@media (orientation: portrait) {
  ...;
}
```
