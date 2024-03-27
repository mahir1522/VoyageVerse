export class Posts{

  title:string;
  description:string;
  imageUrl: string;


  constructor(title:string, description:string, imageUrl:string){
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
  }

  static getPosts(): Posts[]{
    return[
      new Posts('India', 'The Taj Mahal stands as an enduring symbol of love and architectural splendor, constructed by Mughal Emperor Shah Jahan in memory of his beloved wife, Mumtaz Mahal. Completed in 1653 after 22 years of labor, this marvel blends Persian, Islamic, and Indian architectural styles, showcasing intricate marble carvings, precious gemstone inlays, and Quranic calligraphy. Surrounded by lush Charbagh gardens, its central mausoleum houses the tombs of the emperor and his consort, while reflecting pools and fountains add to its serene ambiance. ', 'assets/images/India.jpg'),
      new Posts('Singapore', '\n' +
        'Sentosa Island, located off the southern coast of Singapore, is a renowned resort destination offering a plethora of attractions and activities for visitors of all ages. From thrilling theme parks like Universal Studios Singapore and Adventure Cove Waterpark to tranquil beaches such as Siloso and Palawan, Sentosa caters to diverse interests. Nature enthusiasts can explore lush greenery and wildlife habitats, while entertainment seekers can enjoy live shows and vibrant dining options. With convenient access via road, cable car, or monorail, Sentosa Island provides a perfect blend of relaxation, adventure, and entertainment, making it a premier destination in Southeast Asia.', 'assets/images/Singapore.jpg'),
      new Posts('Paris', 'The Louvre Museum, situated in Paris, France, stands as one of the world\'s largest and most iconic art museums, renowned for its extensive collection spanning thousands of years of human civilization. Housed within the former royal palace, the museum showcases an unparalleled array of artworks, including the famous Mona Lisa by Leonardo da Vinci, the Venus de Milo, and the Winged Victory of Samothrace. Its vast galleries exhibit diverse art forms, from ancient Egyptian artifacts to European paintings, sculpture, and decorative arts. As a cultural beacon attracting millions of visitors annually, the Louvre Museum symbolizes the richness and diversity of global artistic heritage.', 'assets/images/Paris.jpg')
    ]
  }
}


