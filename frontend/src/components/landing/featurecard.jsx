function FeatureCard({ icon, title, description, color = "bg-blue-500" }) {
    return (
        <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
           <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white mb-4 ${color}`}>
                {icon}
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
}

export default FeatureCard;