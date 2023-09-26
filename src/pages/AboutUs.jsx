import SimpleMap from '../cmps/StoreLocation'

export function AboutUs() {
    return (
        <section className="about">
            <h2 className="about-header-title">About Toy Store</h2>
            <p className="about-description">At Toy Store, we believe in the power of play. From the tiniest trinkets to the grandest playsets, we provide a magical world of toys for children of all ages.</p>
            
            <div className="about-features-container">
                <h3 className="about-features-title">Why Shop With Us?</h3>
                <ul className="about-features-list">
                    <li className="about-feature-item">Vast range of top-quality toys</li>
                    <li className="about-feature-item">Environmentally conscious and safe products</li>
                    <li className="about-feature-item">Friendly and knowledgeable staff</li>
                    <li className="about-feature-item">Secure online shopping and fast delivery</li>
                </ul>
            </div>
            
            <p className="about-user-text">Join thousands of satisfied parents and gift-givers who trust ToyBox Store to bring joy to their loved ones.</p>
            <SimpleMap />
        </section>
    )
}
