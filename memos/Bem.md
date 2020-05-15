# Bem 記法について

# 目次

<!-- vim-markdown-toc GFM -->

- [目的](#目的)
- [BEM の規則](#bem-規則)
  - [Block](#block)
    - [命名規則](#命名規則)
  - [Element](#element)
    - [命名規則](#命名規則-1)
  - [Modifier](#modifier)
    - [命名規則](#命名規則-2)
- [ディレクトリ構成のベストプラクティス](#構成)
- [Block の入れ子の実装](#block-入子実装)
  - [Wrap](#wrap)
  - [Mixes](#mixes)
  - [Mixes](#mixes-1)
- [Block の再利用](#block-再利用)
- [参考文献](#参考文献)

<!-- vim-markdown-toc -->

# 目的

- BEM 記法の基礎について理解する。
- BEM 記法の規則について説明できるようになる。
- BEM 記法で SCSS を書けるようになる。

# BEM の規則

BEM では、CSS を **Block**、**Element**、**Modifier** の3つに分ける。

- Block: Web ページを構成するパーツである。ボタンや検索モジュール、ヘッダー、ナビゲーションなど。
- Element: Block を構成する要素である。Block に内包されている必要がある。
- Modifier: Block や Element の見た目を変える要素である。

## Block

Block は、Web ページを構成するパーツである。ページや他の要素に依存することなく、独立で存在できる。複数ページやシーンをまたがって、再利用できることが想定されている。

### 命名規則

クラス名は `Block` とする。

例えば、`header`、`navigation`、`button` とする。

## Element

Element は、Block を構成する要素である。Block に依存するため、単独で存在することはできない。

### 命名規則

クラス名は `Block__Element` とする。

例えば、`navigation__list`、`navigation__item`、`navigation__link` とする。

## Modifier

Modifier は、Block や Element の見た目の振る舞いを変えるスタイルである。色が異なるボタンのタイプや、アクティブ状態のタブなどに用いる。

### 命名規則

クラス名は `Block_key_value` とする。

例えば、`button_color_primary` とする。

# ディレクトリ構成のベストプラクティス

BEM のディレクトリ構成の原則として、次の2つがある。

1. Block ごとにファイルを分割し、ブロック名とファイル名とを合わせる。
2. Sass の利用を前提に考える。

例えば、以下のような構成が考えられる。

- ./
  - setting/
    - color.scss
    - font.scss
  - block/
    - icon.scss
    - button.scss
    - header.scss
    - navigation.scss

Element と Modifier は、依存する Block のファイルに記述する。

# Block の入れ子の実装

Block は他の Block に内包される可能性がある。そのような場合、wrap や mixes という方法を用いる。

## Wrap

Wrap は、内包された Block を内包する Element を定義する。追加のスタイルは、定義した Element に書く。

- media: Block
  - media__button: button を wrap する Element
    - button: media に内包された Block

## Mixes

???

## Mixes

# Block の再利用

Block は複数ページ、複数シーンでの利用ができる。そのため、再利用されることを想定して作る必要がある。

同じ Element が何度も登場する場合、その Element を Block に書き換えるというリファクタリングをする必要がある。リファクタリングするタイミングの判断基準として **Rule of three** というものがある。Rule of three は、三度登場したものはパターンとして成立するという考え方である。この考え方では、三度登場した Element は Block で書き換えることになる。

# 参考文献

- 堀口誠人、*最強のCSS設計 チーム開発を成功に導くケーススタディ*, SB Creative, 2015
- [一番詳しいCSS設計規則BEMのマニュアル - Qiita](https://qiita.com/Takuan_Oishii/items/0f0d2c5dc33a9b2d9cb1)
