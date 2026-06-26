function FeatureCard({ icon, title, description, color}){
    return (
        <div>
            <div>
                {icon}
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default FeatureCard;