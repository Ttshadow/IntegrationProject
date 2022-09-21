package com.example.backend.service;

import com.example.backend.entity.CartItem;
import com.example.backend.exception.RecordNotFoundException;
import com.example.backend.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {
    private final CartItemRepository cartItemRepository;

    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }
    public List<CartItem> getAllCartItemByUserId(Long id){
        return cartItemRepository.getAllCartItemByUserId(id);
    }
    public CartItem getCartItemById(Long id) throws RecordNotFoundException {
        Optional<CartItem> cartItem = cartItemRepository.findById(id);
        if(cartItem.isPresent()){
            return cartItem.get();
        }
        throw new RecordNotFoundException("Cart Item Not Found");
    }
    public void saveOrUpdateCartItem(CartItem newCartItem) throws RecordNotFoundException {
        Optional<CartItem> cartItemFromDb = cartItemRepository.getCartItemByUserAndMenu(newCartItem.getUser().getId(), newCartItem.getMenu().getId());
        if(!cartItemFromDb.isPresent()){
            cartItemRepository.save(newCartItem);
        }
        else{
            updateCartItemQuantity(cartItemFromDb.get().getId(), newCartItem.getQuantity() + cartItemFromDb.get().getQuantity());
        }
    }
    public void updateCartItemQuantity(Long cartItemId, int qty) throws RecordNotFoundException {
        CartItem cartItem = getCartItemById(cartItemId);
        cartItem.setQuantity(qty);
        cartItemRepository.save(cartItem);
    }
    public void deleteCartItemById(Long id){
        cartItemRepository.deleteById(id);
    }

    public void deleteCartItemByUserId(Long id){
        List<CartItem> cartItems = getAllCartItemByUserId(id);
        for (CartItem item: cartItems) {
            cartItemRepository.deleteById(item.getId());
        }
    }
}
